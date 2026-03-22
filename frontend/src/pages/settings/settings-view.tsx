import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/settings/settingsSlice'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";
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

import {hasPermission} from "../../helpers/userPermissions";


const SettingsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { settings } = useAppSelector((state) => state.settings)
    
    const { currentUser } = useAppSelector((state) => state.auth);
    

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
              <title>{getPageTitle('View settings')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View settings')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/settings/settings-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              

              

              

              

              

              

              

              

              

              
                {hasPermission(currentUser, 'READ_ORGANIZATIONS') && 
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Organization</p>
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{settings?.organization?.name ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                  } 
              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Key</p>
                    <p>{settings?.key}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={settings?.value} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={settings?.description} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>ValueType</p>
                    <p>{settings?.value_type ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              
                <FormField label='IsSensitive'>
                    <SwitchField
                      field={{name: 'is_sensitive', value: settings?.is_sensitive}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

                
                
                
                
                
                
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/settings/settings-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

SettingsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_SETTINGS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default SettingsView;