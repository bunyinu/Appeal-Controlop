import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/appeal_drafts/appeal_draftsSlice'
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


const Appeal_draftsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { appeal_drafts } = useAppSelector((state) => state.appeal_drafts)
    
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
              <title>{getPageTitle('View appeal_drafts')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View appeal_drafts')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/appeal_drafts/appeal_drafts-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              

              

              

              

              

              

              

              

              

              
                {hasPermission(currentUser, 'READ_ORGANIZATIONS') && 
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Organization</p>
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{appeal_drafts?.organization?.name ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                  } 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Case</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{appeal_drafts?.case?.case_number ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Author</p>
                    
                    
                        <p>{appeal_drafts?.author_user?.firstName ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Title</p>
                    <p>{appeal_drafts?.title}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Status</p>
                    <p>{appeal_drafts?.status ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Content</p>
                  {appeal_drafts.content
                    ? <p dangerouslySetInnerHTML={{__html: appeal_drafts.content}}/>
                    : <p>No data</p>
                  }
                </div>
              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Attachments</p>
                    {appeal_drafts?.attachments?.length
                      ? dataFormatter.filesFormatter(appeal_drafts.attachments).map(link => (
                        <button
                          key={link.publicUrl}
                          onClick={(e) => saveFile(e, link.publicUrl, link.name)}
                        >
                            {link.name}
                        </button>
                      )) : <p>No Attachments</p>
                    }
                </div>
              
              

              

              

              

              

              

              
                <FormField label='SubmittedAt'>
                    {appeal_drafts.submitted_at ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={appeal_drafts.submitted_at ?
                        new Date(
                          dayjs(appeal_drafts.submitted_at).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No SubmittedAt</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

                
                
                
                
                
                
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/appeal_drafts/appeal_drafts-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

Appeal_draftsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_APPEAL_DRAFTS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default Appeal_draftsView;