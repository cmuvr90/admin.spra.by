import {useModal} from './index'
import {Modal} from '@shopify/polaris'

export function useConfirm() {
  const modal = useModal()

  const defaultModalSettings = {
    open: true,
    title: 'Deleting',
    content: <Modal.Section>
      Are you sure you want to delete this?
    </Modal.Section>,
    primaryAction: {
      content: 'Yes',
      onAction: () => {},
    },
    secondaryActions: [{
      content: 'No',
      onAction: () => {},
    }],
  }

  const open = (
    access: () => Promise<void> = async function () {},
    params: any = {},
    decline?: () => Promise<void>
  ) => {
    modal.change({
      ...defaultModalSettings,
      ...params,
      primaryAction: {
        ...defaultModalSettings.primaryAction,
        onAction: async () => {
          modal.primary.loading()
          await access()
          modal.close()
        },
      },
      secondaryActions: [{
        ...defaultModalSettings.secondaryActions[0],
        onAction: async () => {
          modal.secondary.loading(1)
          if (typeof decline === 'function') await decline()
          modal.close()
        },
      }],
    })
  }

  return {
    open,
  }
}