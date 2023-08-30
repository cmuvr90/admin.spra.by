import {isEqual} from 'lodash'
import {useTopBar} from "@/hooks/useTopbar";

export function useSaveBar(defaultValue: any, onSave: () => Promise<void>, onDiscard: () => Promise<void>) {
  const topBar = useTopBar(
    {
      content: 'Save',
      onAction: onSaveAction,
    },
    {
      content: 'Discard',
      onAction: onDiscardAction,
    },
  );

  async function onSaveAction() {
    topBar.primary.loading()
    await onSave()
    topBar.primary.unloading()
  }

  async function onDiscardAction() {
    topBar.secondary.loading()
    await onDiscard()
    topBar.secondary.unloading()
  }

  const onChange = (value: any) => {
    if (isEqual(defaultValue, value)) {
      topBar.active(false);
    } else {
      topBar.active(true);
    }
  }

  return {onChange}
}
