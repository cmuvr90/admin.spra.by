import {useDispatch} from 'react-redux'
import {
  onChangeTopBar,
  onChangeTopBarPrimaryAction,
  onChangeTopBarSecondayAction,
  onResetTopBar
} from "@/redux/actions/layoutActions";

export function useTopBar(primaryAction?: any, secondaryAction?: any) {
  const dispatch = useDispatch()

  const reset = () => dispatch(onResetTopBar())

  const change = (value: any) => dispatch(onChangeTopBar({
    saveAction: primaryAction,
    discardAction: secondaryAction,
    fullWidth: false,
    ...value,
  }))

  const active = (value = true) => change({active: value})


  const loadingPrimaryAction = (value = true) => dispatch(onChangeTopBarPrimaryAction({loading: value}))


  const unloadingPrimaryAction = () => loadingPrimaryAction(false)


  const loadingSecondaryAction = (value = true) => dispatch(onChangeTopBarSecondayAction({loading: value}))


  const unloadingSecondaryAction = () => loadingSecondaryAction(false)

  return {
    active,
    reset,
    primary: {
      loading: loadingPrimaryAction,
      unloading: unloadingPrimaryAction,
    },
    secondary: {
      loading: loadingSecondaryAction,
      unloading: unloadingSecondaryAction,
    }
  }
}
