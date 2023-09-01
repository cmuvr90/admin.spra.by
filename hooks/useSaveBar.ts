import {useTopBar} from "@/hooks/useTopbar";
import {isEqualDeep} from "@/utils";

export function useSaveBar(onSave: () => Promise<void>, onDiscard: () => Promise<void>) {
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

  const onChange = (before: any, after: any) => {
    const isEqual = isEqualDeep(before, after)
    topBar.active(!isEqual);
    return isEqual;
  }

  return {onChange}
}
