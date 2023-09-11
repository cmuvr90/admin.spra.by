import React, {useEffect, useState} from 'react'
import {Box, Divider, LegacyStack, Tag, Text} from '@shopify/polaris'
import {Option, OptionValueData} from "@/services/types/Option";

/**
 *
 * @param url
 * @constructor
 */
const OptionsSelect = ({options = [], onChange}: Props) => {

  const [selectedOptions, setSelectedOptions] = useState<OptionValueData[]>([])

  useEffect(() => {
    if (typeof onChange === 'function') onChange(selectedOptions)
  }, [selectedOptions])

  const onAdd = (value: string, option: Option) => {
    setSelectedOptions((v) => {
      const isExist = !!v.find(i => i.option === option.id && i.value === value);
      return (!isExist ? [...v, {option: option.id, name: option.name, title: option.title, value,}] as OptionValueData[] : v)
    })
  }

  const onRemove = (item: OptionValueData) => {
    setSelectedOptions(v => v.filter(i => !(i.option === item.option && i.value === item.value)))
  }

  const selectedOptionsMarkUp = <div style={{minHeight: '50px'}}>
    <LegacyStack>
      {
        selectedOptions.map(i => {
          const option = options.find(o => o.id === i.option)
          const optionName = option?.name?.length ?
            <LegacyStack spacing={'none'}>
              <Text as={'span'} variant={'bodySm'} fontWeight={'bold'}>{option.name}</Text>
              <Text as={'span'} variant={'bodySm'}>: {i.value}</Text>
            </LegacyStack> :
            <Text as={'span'} variant={'bodySm'}>: {i.value}</Text>
          return <Tag key={i.option} onRemove={() => onRemove(i)}>{optionName}</Tag>
        })
      }
    </LegacyStack>
  </div>

  const renderOptionsSelectItem = (option: Option) => {
    const isDisable = !!option.values.find(value => selectedOptions.find(i => i.option === option.id && i.value === value))

    return <LegacyStack vertical key={option.name}>
      <Box>
        <Divider/>
      </Box>
      <Box>
        <LegacyStack vertical>
          <Text as={'h3'} variant={'headingMd'}>{option.name}</Text>
          <LegacyStack>
            {
              (option?.values ?? []).map(value => {
                return <Tag
                  key={value}
                  disabled={isDisable}
                  onClick={() => onAdd(value, option)}
                >
                  {value}
                </Tag>
              })
            }
          </LegacyStack>
        </LegacyStack>
      </Box>
    </LegacyStack>
  }

  return <LegacyStack vertical>
    {selectedOptionsMarkUp}
    <LegacyStack vertical>
      {
        (options ?? []).map(renderOptionsSelectItem)
      }
    </LegacyStack>
  </LegacyStack>
}
export default OptionsSelect

type Props = {
  options: Option[],
  onChange: (value: OptionValueData[]) => void
}