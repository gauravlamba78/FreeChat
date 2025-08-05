
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Voice_interactionsDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const voice_interactions = await db.voice_interactions.create(
            {
                id: data.id || undefined,

        transcript: data.transcript
        ||
        null
            ,

        interaction_date: data.interaction_date
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return voice_interactions;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const voice_interactionsData = data.map((item, index) => ({
                id: item.id || undefined,

                transcript: item.transcript
            ||
            null
            ,

                interaction_date: item.interaction_date
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const voice_interactions = await db.voice_interactions.bulkCreate(voice_interactionsData, { transaction });

        return voice_interactions;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const voice_interactions = await db.voice_interactions.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.transcript !== undefined) updatePayload.transcript = data.transcript;

        if (data.interaction_date !== undefined) updatePayload.interaction_date = data.interaction_date;

        updatePayload.updatedById = currentUser.id;

        await voice_interactions.update(updatePayload, {transaction});

        return voice_interactions;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const voice_interactions = await db.voice_interactions.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of voice_interactions) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of voice_interactions) {
                await record.destroy({transaction});
            }
        });

        return voice_interactions;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const voice_interactions = await db.voice_interactions.findByPk(id, options);

        await voice_interactions.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await voice_interactions.destroy({
            transaction
        });

        return voice_interactions;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const voice_interactions = await db.voice_interactions.findOne(
            { where },
            { transaction },
        );

        if (!voice_interactions) {
            return voice_interactions;
        }

        const output = voice_interactions.get({plain: true});

        return output;
    }

    static async findAll(filter, options) {
        const limit = filter.limit || 0;
        let offset = 0;
        let where = {};
        const currentPage = +filter.page;

        const user = (options && options.currentUser) || null;

        offset = currentPage * limit;

        const orderBy = null;

        const transaction = (options && options.transaction) || undefined;

        let include = [];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

                if (filter.transcript) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'voice_interactions',
                            'transcript',
                            filter.transcript,
                        ),
                    };
                }

            if (filter.interaction_dateRange) {
                const [start, end] = filter.interaction_dateRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    interaction_date: {
                    ...where.interaction_date,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    interaction_date: {
                    ...where.interaction_date,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.gte]: start,
                        },
                    };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.lte]: end,
                        },
                    };
                }
            }
        }

        const queryOptions = {
            where,
            include,
            distinct: true,
            order: filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction: options?.transaction,
            logging: console.log
        };

        if (!options?.countOnly) {
            queryOptions.limit = limit ? Number(limit) : undefined;
            queryOptions.offset = offset ? Number(offset) : undefined;
        }

        try {
            const { rows, count } = await db.voice_interactions.findAndCountAll(queryOptions);

            return {
                rows: options?.countOnly ? [] : rows,
                count: count
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    static async findAllAutocomplete(query, limit, offset) {
        let where = {};

        if (query) {
            where = {
                [Op.or]: [
                    { ['id']: Utils.uuid(query) },
                    Utils.ilike(
                        'voice_interactions',
                        'transcript',
                        query,
                    ),
                ],
            };
        }

        const records = await db.voice_interactions.findAll({
            attributes: [ 'id', 'transcript' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['transcript', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.transcript,
        }));
    }

};

