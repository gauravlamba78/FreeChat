import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/roles/rolesSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const RolesView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { roles } = useAppSelector((state) => state.roles)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View roles')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View roles')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/roles/roles-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Name</p>
                    <p>{roles?.name}</p>
                </div>

                <FormField label='Global Access'>
                    <SwitchField
                      field={{name: 'globalAccess', value: roles?.globalAccess}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>

                <>
                    <p className={'block font-bold mb-2'}>Users App Role</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>First Name</th>

                                <th>Last Name</th>

                                <th>Phone Number</th>

                                <th>E-Mail</th>

                                <th>Disabled</th>

                            </tr>
                            </thead>
                            <tbody>
                            {roles.users_app_role && Array.isArray(roles.users_app_role) &&
                              roles.users_app_role.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/users/users-view/?id=${item.id}`)}>

                                    <td data-label="firstName">
                                        { item.firstName }
                                    </td>

                                    <td data-label="lastName">
                                        { item.lastName }
                                    </td>

                                    <td data-label="phoneNumber">
                                        { item.phoneNumber }
                                    </td>

                                    <td data-label="email">
                                        { item.email }
                                    </td>

                                    <td data-label="disabled">
                                        { dataFormatter.booleanFormatter(item.disabled) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!roles?.users_app_role?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/roles/roles-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

RolesView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default RolesView;
