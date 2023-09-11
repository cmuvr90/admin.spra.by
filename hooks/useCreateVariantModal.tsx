import {useModal} from './index'
import React, {useEffect, useState} from 'react'
import {Option, OptionValueData} from "@/services/types/Option";
import OptionsSelect from "@/components/OptionsSelect";

export function useCreateVariantModal() {
  const modal = useModal()

  const [params, setParams] = useState<DataType>({complete: false, options: []})

  useEffect(() => {
    modal.primary.disable(!params.complete)
  }, [params])

  /**
   *
   * @param options
   * @param onCreate
   */
  const open = (options: Option[], onCreate: (data: any) => Promise<any>) => {
    modal.change({
      open: true,
      title: 'Create variant',
      content: <ModalContent options={options} onChange={setParams}/>,
      primaryAction: {
        content: 'Create',
        disabled: true,
        onAction: () => {
          modal.primary.loading()
          setParams(params => {
            onCreate({values: params.options}).finally(() => { modal.close() })
            return params
          })
        },
      },
    })
  }

  return {open}
}


const ModalContent = ({options, onChange}: { options: Option[], onChange: (data: DataType) => void }) => {
  const [selectedOptions, setSelectedOptions] = useState<OptionValueData[]>([])

  useEffect(() => {
    onChange({
      complete: !(options.length === 0 || selectedOptions?.length !== options.length),
      options: selectedOptions,
    })
  }, [options, selectedOptions])


  return <div style={{minHeight: '450px', overflow: 'hidden auto'}}>
    <OptionsSelect options={options} onChange={setSelectedOptions}/>
  </div>
}


type DataType = {
  complete: boolean,
  options: OptionValueData[]
}
