import { mdiAccount, mdiChartTimelineVariant, mdiMail, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
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
import FormFilePicker from '../../components/FormFilePicker'
import FormImagePicker from '../../components/FormImagePicker'
import { SwitchField } from '../../components/SwitchField'

import { SelectField } from '../../components/SelectField'
import { SelectFieldMany } from "../../components/SelectFieldMany";
import {RichTextField} from "../../components/RichTextField";

import { create } from '../../stores/activity_logs/activity_logsSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    
    
    
    
    
    
    
    
    
    
    
    organization: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    case: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    actor_user: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    entity_type: 'case',
    
    
    
    
    
    
    
    entity_key: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    action: 'created',
    
    
    
    
    
    
    
    
    message: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    occurred_at: '',
    
    
    
    
    
    
    
    
    
    
    ip_address: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}


const Activity_logsNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/activity_logs/activity_logs-list')
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="New Item" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
                
                initialValues
                
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>





















  <FormField label="Organization" labelFor="organization">
      <Field name="organization" id="organization" component={SelectField} options={[]} itemRef={'organizations'}></Field>
  </FormField>



























  <FormField label="Case" labelFor="case">
      <Field name="case" id="case" component={SelectField} options={[]} itemRef={'cases'}></Field>
  </FormField>



























  <FormField label="Actor" labelFor="actor_user">
      <Field name="actor_user" id="actor_user" component={SelectField} options={[]} itemRef={'users'}></Field>
  </FormField>























  <FormField label="EntityType" labelFor="entity_type">
      <Field name="entity_type" id="entity_type" component="select">
      
        <option value="case">case</option>
      
        <option value="task">task</option>
      
        <option value="document">document</option>
      
        <option value="appeal_draft">appeal_draft</option>
      
        <option value="note">note</option>
      
        <option value="payer">payer</option>
      
        <option value="user">user</option>
      
        <option value="setting">setting</option>
      
      </Field>
  </FormField>













  <FormField
      label="EntityKey"
  >
      <Field
          name="entity_key"
          placeholder="EntityKey"
      />
  </FormField>









































  <FormField label="Action" labelFor="action">
      <Field name="action" id="action" component="select">
      
        <option value="created">created</option>
      
        <option value="updated">updated</option>
      
        <option value="assigned">assigned</option>
      
        <option value="status_changed">status_changed</option>
      
        <option value="priority_changed">priority_changed</option>
      
        <option value="submitted">submitted</option>
      
        <option value="uploaded">uploaded</option>
      
        <option value="commented">commented</option>
      
        <option value="deleted">deleted</option>
      
        <option value="restored">restored</option>
      
        <option value="login">login</option>
      
      </Field>
  </FormField>















    <FormField label="Message" hasTextareaHeight>
        <Field name="message" as="textarea" placeholder="Message" />
    </FormField>



































  <FormField
      label="OccurredAt"
  >
      <Field
          type="datetime-local"
          name="occurred_at"
          placeholder="OccurredAt"
      />
  </FormField>

















  <FormField
      label="IPAddress"
  >
      <Field
          name="ip_address"
          placeholder="IPAddress"
      />
  </FormField>

























              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/activity_logs/activity_logs-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

Activity_logsNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_ACTIVITY_LOGS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default Activity_logsNew
