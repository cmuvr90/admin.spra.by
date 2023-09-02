import {useDispatch} from 'react-redux'
import {
  onChangeModal,
  onChangeModalPrimaryAction,
  onChangeModalSecondaryAction,
  onResetModal
} from "@/redux/actions/layoutActions";

export function useModal() {
  const dispatch = useDispatch()

  const close = () => dispatch(onResetModal())

  const change = (params: any = {}) => dispatch(onChangeModal(params))

  const setTitle = (value: string = '') => change({title: value})

  const setContent = (value: string = '') => change({content: value})

  const loading = (value: boolean = true) => change({loading: value})

  const unloading = () => loading(false)

  const primaryChange = (value: any = {}) => dispatch(onChangeModalPrimaryAction(value))

  const primaryChangeTitle = (value: string = '') => primaryChange({content: value})

  const primaryLoading = (value: boolean = true) => primaryChange({loading: value})

  const primaryDisable = (value: boolean = true) => primaryChange({disabled: value})

  const primaryUnloading = () => primaryLoading(false)

  const secondaryChange = (index: number = 1, value: any = {}) => dispatch(onChangeModalSecondaryAction({index, value}))

  const secondaryChangeTitle = (i: number = 1, value: string = '') => secondaryChange(i, {content: value})

  const secondaryLoading = (i: number = 1, value: boolean = true) => secondaryChange(i, {loading: value})

  const secondaryDisable = (i: number = 1, value: boolean = true) => secondaryChange(i, {disabled: value})

  const secondaryUnloading = (i: number) => secondaryLoading(i, false)

  return {
    change,
    close,
    loading,
    unloading,
    setTitle,
    setContent,
    primary: {
      change: primaryChange,
      setTitle: primaryChangeTitle,
      loading: primaryLoading,
      disable: primaryDisable,
      unloading: primaryUnloading,
    },
    secondary: {
      change: secondaryChange,
      setTitle: secondaryChangeTitle,
      loading: secondaryLoading,
      disable: secondaryDisable,
      unloading: secondaryUnloading,
    },
  }
}
