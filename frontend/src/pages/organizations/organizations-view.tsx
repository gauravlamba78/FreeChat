import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/organizations/organizationsSlice'
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

const OrganizationsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { organizations } = useAppSelector((state) => state.organizations)

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
              <title>{getPageTitle('View organizations')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View organizations')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/organizations/organizations-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Name</p>
                    <p>{organizations?.name}</p>
                </div>

                <>
                    <p className={'block font-bold mb-2'}>Users Organizations</p>
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
                            {organizations.users_organizations && Array.isArray(organizations.users_organizations) &&
                              organizations.users_organizations.map((item: any) => (
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
                        {!organizations?.users_organizations?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Conversions Organization</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>ConversionType</th>

                                <th>RequestedAt</th>

                                <th>CompletedAt</th>

                            </tr>
                            </thead>
                            <tbody>
                            {organizations.conversions_organization && Array.isArray(organizations.conversions_organization) &&
                              organizations.conversions_organization.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/conversions/conversions-view/?id=${item.id}`)}>

                                    <td data-label="conversion_type">
                                        { item.conversion_type }
                                    </td>

                                    <td data-label="requested_at">
                                        { dataFormatter.dateTimeFormatter(item.requested_at) }
                                    </td>

                                    <td data-label="completed_at">
                                        { dataFormatter.dateTimeFormatter(item.completed_at) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!organizations?.conversions_organization?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Conversions organizations</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>ConversionType</th>

                                <th>RequestedAt</th>

                                <th>CompletedAt</th>

                            </tr>
                            </thead>
                            <tbody>
                            {organizations.conversions_organizations && Array.isArray(organizations.conversions_organizations) &&
                              organizations.conversions_organizations.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/conversions/conversions-view/?id=${item.id}`)}>

                                    <td data-label="conversion_type">
                                        { item.conversion_type }
                                    </td>

                                    <td data-label="requested_at">
                                        { dataFormatter.dateTimeFormatter(item.requested_at) }
                                    </td>

                                    <td data-label="completed_at">
                                        { dataFormatter.dateTimeFormatter(item.completed_at) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!organizations?.conversions_organizations?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Documents Organization</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Title</th>

                            </tr>
                            </thead>
                            <tbody>
                            {organizations.documents_organization && Array.isArray(organizations.documents_organization) &&
                              organizations.documents_organization.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/documents/documents-view/?id=${item.id}`)}>

                                    <td data-label="title">
                                        { item.title }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!organizations?.documents_organization?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Documents organizations</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Title</th>

                            </tr>
                            </thead>
                            <tbody>
                            {organizations.documents_organizations && Array.isArray(organizations.documents_organizations) &&
                              organizations.documents_organizations.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/documents/documents-view/?id=${item.id}`)}>

                                    <td data-label="title">
                                        { item.title }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!organizations?.documents_organizations?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Images Organization</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Title</th>

                            </tr>
                            </thead>
                            <tbody>
                            {organizations.images_organization && Array.isArray(organizations.images_organization) &&
                              organizations.images_organization.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/images/images-view/?id=${item.id}`)}>

                                    <td data-label="title">
                                        { item.title }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!organizations?.images_organization?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Images organizations</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Title</th>

                            </tr>
                            </thead>
                            <tbody>
                            {organizations.images_organizations && Array.isArray(organizations.images_organizations) &&
                              organizations.images_organizations.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/images/images-view/?id=${item.id}`)}>

                                    <td data-label="title">
                                        { item.title }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!organizations?.images_organizations?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Voice_interactions Organization</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Transcript</th>

                                <th>InteractionDate</th>

                            </tr>
                            </thead>
                            <tbody>
                            {organizations.voice_interactions_organization && Array.isArray(organizations.voice_interactions_organization) &&
                              organizations.voice_interactions_organization.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/voice_interactions/voice_interactions-view/?id=${item.id}`)}>

                                    <td data-label="transcript">
                                        { item.transcript }
                                    </td>

                                    <td data-label="interaction_date">
                                        { dataFormatter.dateTimeFormatter(item.interaction_date) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!organizations?.voice_interactions_organization?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <>
                    <p className={'block font-bold mb-2'}>Voice_interactions organizations</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Transcript</th>

                                <th>InteractionDate</th>

                            </tr>
                            </thead>
                            <tbody>
                            {organizations.voice_interactions_organizations && Array.isArray(organizations.voice_interactions_organizations) &&
                              organizations.voice_interactions_organizations.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/voice_interactions/voice_interactions-view/?id=${item.id}`)}>

                                    <td data-label="transcript">
                                        { item.transcript }
                                    </td>

                                    <td data-label="interaction_date">
                                        { dataFormatter.dateTimeFormatter(item.interaction_date) }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!organizations?.voice_interactions_organizations?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/organizations/organizations-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

OrganizationsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default OrganizationsView;
