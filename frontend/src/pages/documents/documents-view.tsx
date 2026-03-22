import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/documents/documentsSlice'
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


const DocumentsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { documents } = useAppSelector((state) => state.documents)
    
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
              <title>{getPageTitle('View documents')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View documents')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/documents/documents-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              

              

              

              

              

              

              

              

              

              
                {hasPermission(currentUser, 'READ_ORGANIZATIONS') && 
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Organization</p>
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{documents?.organization?.name ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                  } 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Case</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{documents?.case?.case_number ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>UploadedBy</p>
                    
                    
                        <p>{documents?.uploaded_by_user?.firstName ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Category</p>
                    <p>{documents?.category ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Title</p>
                    <p>{documents?.title}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={documents?.description} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>File</p>
                    {documents?.file?.length
                      ? dataFormatter.filesFormatter(documents.file).map(link => (
                        <button
                          key={link.publicUrl}
                          onClick={(e) => saveFile(e, link.publicUrl, link.name)}
                        >
                            {link.name}
                        </button>
                      )) : <p>No File</p>
                    }
                </div>
              
              

              

              

              

              

              

              

              

              

              
                <FormField label='IsConfidential'>
                    <SwitchField
                      field={{name: 'is_confidential', value: documents?.is_confidential}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='ReceivedAt'>
                    {documents.received_at ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={documents.received_at ?
                        new Date(
                          dayjs(documents.received_at).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No ReceivedAt</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

                
                
                
                
                
                
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/documents/documents-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

DocumentsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_DOCUMENTS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default DocumentsView;