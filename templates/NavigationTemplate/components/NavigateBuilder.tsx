import React from 'react'
import {Button, LegacyStack} from '@shopify/polaris'
import {AddMajor} from '@shopify/polaris-icons'
import {NavigateBuilderItem} from './NavigateBuilderItem'
import {MenuItem} from "@/services/types/Navigation";

export const NavigateBuilder = ({
                                  menu = [],
                                  prefix = '',
                                  onChange,
                                  onEdit,
                                  deep = 0,
                                }: Props) => {

  const onAddItem = () => {
    onChange([...menu, {title: '', url: ''}])
  }

  const onDeleteItem = (index: number) => {
    onChange([...menu.filter((_, i) => i !== index)])
  }

  /**
   *
   */
  return <div style={deep === 0 ? {
    borderLeft: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRight: '1px solid #ccc',
  } : {borderLeft: '1px solid #ccc'}}>
    <LegacyStack vertical spacing={'none'}>
      {
        menu.map((menuItem, index) => {
          return <NavigateBuilderItem
            menuItem={menuItem}
            prefix={`${prefix}_${index}`}
            onDelete={() => onDeleteItem(index)}
            onUpdate={v => {
              menuItem.title = v.title //change with link to object
              menuItem.url = v.url //change with link to object
              onChange([...menu])
            }}
            onChange={v => {
              menuItem.children = [...v] //change with link to object
              onChange([...menu])
            }}
            onEdit={onEdit}
          />
        })
      }
      <div style={{borderTop: '1px solid #ccc', marginTop: '-1px', padding: '10px', background: '#fff'}}>
        <LegacyStack distribution={'leading'}>
          <Button
            onClick={() => onAddItem()}
            plain
            removeUnderline
            icon={AddMajor}
          >
            {'Add menu item'}
          </Button>
        </LegacyStack>
      </div>
    </LegacyStack>
  </div>
}


type Props = {
  menu: MenuItem[],
  prefix: string,
  onChange: (menu: MenuItem[]) => any
  onEdit: (menuItem: MenuItem, onUpdate: (menuItem: MenuItem) => any) => any
  deep?: number,
}
