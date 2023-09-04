import React, {useState} from 'react'
import {Button, LegacyStack, Text} from '@shopify/polaris'
import {DeleteMinor, ChevronDownMinor, ChevronRightMinor, EditMajor} from '@shopify/polaris-icons'
import {NavigateBuilder} from './NavigateBuilder'
import {MenuItem} from "@/services/types/Navigation";

export const NavigateBuilderItem = ({
                                      menuItem,
                                      prefix,
                                      onChange,
                                      onUpdate,
                                      onDelete,
                                      onEdit,
                                    }: Props) => {
  const [show, setShow] = useState(false)

  return <LegacyStack key={prefix} vertical spacing={'none'}>
    <div style={{
      borderBottom: '1px solid #ccc',
      borderTop: '1px solid #ccc',
      marginTop: '-1px',
      padding: '10px',
      background: '#fff',
    }}>
      <LegacyStack distribution={'equalSpacing'}>
        <LegacyStack.Item fill>
          <LegacyStack>
            <Button
              plain
              icon={show ? ChevronDownMinor : ChevronRightMinor}
              onClick={() => setShow(v => !v)}
            />
            <LegacyStack.Item fill>
              <div style={{minHeight: '20px', cursor: 'pointer'}}
                   onClick={() => onEdit(menuItem, onUpdate)}>
                {
                  <Text as={'span'}>{menuItem.title}</Text>
                }
              </div>
            </LegacyStack.Item>
          </LegacyStack>
        </LegacyStack.Item>
        <LegacyStack distribution={'trailing'}>
          <Button onClick={() => onEdit(menuItem, onUpdate)} plain icon={EditMajor}/>
          <Button onClick={onDelete} plain icon={DeleteMinor}/>
        </LegacyStack>
      </LegacyStack>
    </div>
    {
      show &&
      <div style={{marginLeft: '50px'}}>
        <NavigateBuilder
          menu={menuItem?.children ?? []}
          prefix={prefix}
          onChange={onChange}
          onEdit={onEdit}
          deep={1}
        />
      </div>
    }
  </LegacyStack>
}

type Props = {
  menuItem: MenuItem,
  prefix: string,
  onChange: (menu: MenuItem[]) => any
  onUpdate: (menuItem: MenuItem) => any
  onDelete: () => any
  onEdit: (menuItem: MenuItem, onUpdate: (menuItem: MenuItem) => any) => any
}