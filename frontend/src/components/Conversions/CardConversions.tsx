import React from 'react';
import ListActionsPopover from '../ListActionsPopover';
import { useAppSelector } from '../../stores/hooks';
import dataFormatter from '../../helpers/dataFormatter';
import { Pagination } from '../Pagination';
import LoadingSpinner from "../LoadingSpinner";
import Link from 'next/link';

type Props = {
  conversions: any[];
  loading: boolean;
  onDelete: (id: string) => void;
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
};

const CardConversions = ({
  conversions,
  loading,
  onDelete,
  currentPage,
  numPages,
  onPageChange,
}: Props) => {
    const asideScrollbarsStyle = useAppSelector(
        (state) => state.style.asideScrollbarsStyle,
    );
    const bgColor = useAppSelector((state) => state.style.cardsColor);
    const darkMode = useAppSelector((state) => state.style.darkMode);
    const corners = useAppSelector((state) => state.style.corners);
    const focusRing = useAppSelector((state) => state.style.focusRingColor);

  return (
    <div className={'p-4'}>
      {loading && <LoadingSpinner />}
      <ul
        role='list'
        className='grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 2xl:grid-cols-4 xl:gap-x-8'
      >
        {!loading && conversions.map((item, index) => (
          <li
            key={item.id}
            className={`overflow-hidden ${corners !== 'rounded-full'? corners : 'rounded-3xl'} border ${focusRing} border-gray-200 dark:border-dark-700 ${
                darkMode ? 'aside-scrollbars-[slate]' : asideScrollbarsStyle
            }`}
          >
              <Link href={`/conversions/conversions-view/?id=${item.id}`} className='text-lg font-bold leading-6 line-clamp-1'>
                  {item.conversion_type}
              </Link>

              <div className='ml-auto'>
                <ListActionsPopover
                  onDelete={onDelete}
                  itemId={item.id}
                  pathEdit={`/conversions/conversions-edit/?id=${item.id}`}
                  pathView={`/conversions/conversions-view/?id=${item.id}`}
                  hasUpdatePermission={true}
                />
              </div>
            </div>
            <dl className='divide-y dark:divide-dark-700 px-6 py-4 text-sm leading-6 h-64 overflow-y-auto'>

                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='text-gray-500 dark:text-dark-600'>ConversionType</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { item.conversion_type }
                        </div>
                    </dd>
                </div>

                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='text-gray-500 dark:text-dark-600'>RequestedAt</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { dataFormatter.dateTimeFormatter(item.requested_at) }
                        </div>
                    </dd>
                </div>

                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='text-gray-500 dark:text-dark-600'>CompletedAt</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { dataFormatter.dateTimeFormatter(item.completed_at) }
                        </div>
                    </dd>
                </div>

                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='text-gray-500 dark:text-dark-600'>User</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { dataFormatter.usersOneListFormatter(item.user) }
                        </div>
                    </dd>
                </div>

                <div className='flex justify-between gap-x-4 py-3'>
                    <dt className='text-gray-500 dark:text-dark-600'>Organization</dt>
                    <dd className='flex items-start gap-x-2'>
                        <div className='font-medium line-clamp-4'>
                            { dataFormatter.organizationsOneListFormatter(item.organization) }
                        </div>
                    </dd>
                </div>

            </dl>
          </li>
        ))}
        {!loading && conversions.length === 0 && (
          <div className='col-span-full flex items-center justify-center h-40'>
            <p className=''>No data to display</p>
          </div>
        )}
      </ul>
      <div className={'flex items-center justify-center my-6'}>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          setCurrentPage={onPageChange}
        />
      </div>
    </div>
  );
};

export default CardConversions;
