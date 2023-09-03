import {useTopBar} from "@/hooks/useTopbar";
import {isEqual} from "lodash";

export function useSaveBar(
  onSave: () => Promise<void>,
  onDiscard: () => Promise<void>,
  options: { primaryContent: string, secondaryContent: string } = {
    primaryContent: 'Save',
    secondaryContent: 'Discard'
  }
) {
  const topBar = useTopBar(
    {
      content: options.primaryContent,
      onAction: onSaveAction,
    },
    {
      content: options.secondaryContent,
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
    const isEquals = isEqual(before, after)
    topBar.active(!isEquals);
    return isEquals;
  }

  return {onChange}
}