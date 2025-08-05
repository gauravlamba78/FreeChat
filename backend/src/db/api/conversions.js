
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ConversionsDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const conversions = await db.conversions.create(
            {
                id: data.id || undefined,

        conversion_type: data.conversion_type
        ||
        null
            ,

        requested_at: data.requested_at
        ||
        null
            ,

        completed_at: data.completed_at
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return conversions;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const conversionsData = data.map((item, index) => ({
                id: item.id || undefined,

                conversion_type: item.conversion_type
            ||
            null
            ,

                requested_at: item.requested_at
            ||
            null
            ,

                completed_at: item.completed_at
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const conversions = await db.conversions.bulkCreate(conversionsData, { transaction });

        return conversions;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const conversions = await db.conversions.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.conversion_type !== undefined) updatePayload.conversion_type = data.conversion_type;

        if (data.requested_at !== undefined) updatePayload.requested_at = data.requested_at;

        if (data.completed_at !== undefined) updatePayload.completed_at = data.completed_at;

        updatePayload.updatedById = currentUser.id;

        await conversions.update(updatePayload, {transaction});

        return conversions;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const conversions = await db.conversions.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of conversions) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of conversions) {
                await record.destroy({transaction});
            }
        });

        return conversions;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const conversions = await db.conversions.findByPk(id, options);

        await conversions.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await conversions.destroy({
            transaction
        });

        return conversions;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const conversions = await db.conversions.findOne(
            { where },
            { transaction },
        );

        if (!conversions) {
            return conversions;
        }

        const output = conversions.get({plain: true});

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

                if (filter.conversion_type) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'conversions',
                            'conversion_type',
                            filter.conversion_type,
                        ),
                    };
                }

            if (filter.requested_atRange) {
                const [start, end] = filter.requested_atRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    requested_at: {
                    ...where.requested_at,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    requested_at: {
                    ...where.requested_at,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.completed_atRange) {
                const [start, end] = filter.completed_atRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    completed_at: {
                    ...where.completed_at,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    completed_at: {
                    ...where.completed_at,
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
            const { rows, count } = await db.conversions.findAndCountAll(queryOptions);

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
                        'conversions',
                        'conversion_type',
                        query,
                    ),
                ],
            };
        }

        const records = await db.conversions.findAll({
            attributes: [ 'id', 'conversion_type' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['conversion_type', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.conversion_type,
        }));
    }

};

