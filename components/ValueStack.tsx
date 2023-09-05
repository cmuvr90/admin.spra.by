import React from 'react'
import {LegacyStack, TextField, Button} from "@shopify/polaris";
import {AddMajor, DeleteMajor} from '@shopify/polaris-icons';

/**
 *
 * @param items
 * @param onChange
 * @constructor
 */
export const ValueStack = ({items, onChange}: { items: string[], onChange: (items: string[]) => void }) => {

  /**
   *
   * @param value
   * @param index
   */
  const onChangeValue = (value: string, index: number) => {
    onChange(items.map((v, i) => i === index ? value : v));
  }

  /**
   *
   * @param value
   */
  const onAddValue = (value: string) => onChange([...items, value]);

  /**
   *
   * @param index
   */
  const onDeleteValue = (index: number) => onChange(items.filter((_, i) => i !== index));

  return <LegacyStack vertical distribution={'fill'}>
    {
      items.map((i, index) => {
        return <LegacyStack distribution={'equalSpacing'} key={index}>
          <LegacyStack.Item fill>
            <TextField
              label={i}
              labelHidden
              onChange={(value) => onChangeValue(value, index)}
              value={i}
              autoComplete={'off'}
            />
          </LegacyStack.Item>
          <Button icon={DeleteMajor} onClick={() => onDeleteValue(index)}/>
        </LegacyStack>
      })
    }
    <LegacyStack distribution={'trailing'}>
      <Button icon={AddMajor} onClick={() => onAddValue('')}/>
    </LegacyStack>
  </LegacyStack>
}

