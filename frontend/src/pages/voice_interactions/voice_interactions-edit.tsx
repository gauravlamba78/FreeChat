import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/voice_interactions/voice_interactionsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import dataFormatter from '../../helpers/dataFormatter';

const EditVoice_interactionsPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    transcript: '',

    interaction_date: new Date(),

    user: null,

    organization: null,

    organizations: null,

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { voice_interactions } = useAppSelector((state) => state.voice_interactions)

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof voice_interactions === 'object') {
      setInitialValues(voice_interactions)
    }
  }, [voice_interactions])

  useEffect(() => {
      if (typeof voice_interactions === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (voice_interactions)[el])
          setInitialValues(newInitialVal);
      }
  }, [voice_interactions])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/voice_interactions/voice_interactions-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit voice_interactions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit voice_interactions'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField label="Transcript" hasTextareaHeight>
        <Field name="transcript" as="textarea" placeholder="Transcript" />
    </FormField>

      <FormField
          label="InteractionDate"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.interaction_date ?
                  new Date(
                      dayjs(initialValues.interaction_date).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'interaction_date': date})}
          />
      </FormField>

  <FormField label='User' labelFor='user'>
        <Field
            name='user'
            id='user'
            component={SelectField}
            options={initialValues.user}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

  <FormField label='Organization' labelFor='organization'>
        <Field
            name='organization'
            id='organization'
            component={SelectField}
            options={initialValues.organization}
            itemRef={'organizations'}

            showField={'name'}

        ></Field>
    </FormField>

  <FormField label='organizations' labelFor='organizations'>
        <Field
            name='organizations'
            id='organizations'
            component={SelectField}
            options={initialValues.organizations}
            itemRef={'organizations'}

            showField={'name'}

        ></Field>
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/voice_interactions/voice_interactions-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditVoice_interactionsPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditVoice_interactionsPage
