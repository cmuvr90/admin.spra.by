export const ON_CHANGE_LOADING = 'ON_CHANGE_LOADING'
export const ON_CHANGE_MESSAGE = 'ON_CHANGE_MESSAGE'

export const ON_CHANGE_MODAL = 'ON_CHANGE_MODAL'
export const ON_CHANGE_MODAL_PRIMARY_ACTION = 'ON_CHANGE_MODAL_PRIMARY_ACTION'
export const ON_CHANGE_MODAL_SECONDARY_ACTION = 'ON_CHANGE_MODAL_SECONDARY_ACTION'

export const ON_CHANGE_TOP_BAR = 'ON_CHANGE_TOP_BAR'
export const ON_CHANGE_TOP_BAR_PRIMARY_ACTION = 'ON_CHANGE_TOP_BAR_PRIMARY_ACTION'
export const ON_CHANGE_TOP_BAR_SECONDARY_ACTION = 'ON_CHANGE_TOP_BAR_SECONDARY_ACTION'

/**
 *
 * @param state
 */
export const onChangeLoading = (state: boolean = true) => ({
  type: ON_CHANGE_LOADING,
  payload: state,
})

/**
 *
 * @param message
 * @param error
 * @param duration
 */
export const onChangeMessage = (
  message: string | null | {[key: string]: string} = null,
  error: boolean = false,
  duration: number = 3000) => {
  const content = Array.isArray(message) ? message.reverse() : (
    typeof message === 'string' ? [message] : (
      (typeof message === 'object' && message !== null) ? Object.values(message) : null
    )
  )

  return {
    type: ON_CHANGE_MESSAGE,
    payload: message ? {
      content,
      error: error,
      duration: duration,
    } : null,
  }
}

/**
 *
 * @param params
 */
export const onChangeModal = (params: any = {}) => ({
  type: ON_CHANGE_MODAL,
  payload: {...params},
})

/**
 *
 */
export const onResetModal = () => onChangeModal({
  large: false,
  open: false,
  title: null,
  content: null,
  primaryAction: null,
  secondaryActions: [],
  loading: false,
  hideSection: false
})

/**
 *
 * @param params
 */
export const onChangeModalPrimaryAction = (params: any = {}) => ({
  type: ON_CHANGE_MODAL_PRIMARY_ACTION,
  payload: {...params},
})

/**
 *
 * @param params
 */
export const onChangeModalSecondaryAction = (params: any = {}) => ({
  type: ON_CHANGE_MODAL_SECONDARY_ACTION,
  payload: {...params},
})

/**
 *
 * @param params
 */
export const onChangeTopBar = (params: any = {}) => ({
  type: ON_CHANGE_TOP_BAR,
  payload: {...params},
})

/**
 *
 */
export const onResetTopBar = () => onChangeTopBar({
  active: false,
  title: null,
  saveAction: null,
  discardAction: null,
  alignContentFlush: false,
  fullWidth: true,
  contextControl: null,
  secondaryMenu: null,
})

/**
 *
 * @param params
 */
export const onChangeTopBarPrimaryAction = (params: any = {}) => ({
  type: ON_CHANGE_TOP_BAR_PRIMARY_ACTION,
  payload: {...params},
})

/**
 *
 * @param params
 */
export const onChangeTopBarSecondayAction = (params: any = {}) => ({
  type: ON_CHANGE_TOP_BAR_SECONDARY_ACTION,
  payload: {...params},
})

export type modalType = {
  large: boolean,
  open: boolean,
  title: string | null,
  content: string | null,
  primaryAction: (() => any) | null,
  secondaryActions: (() => any)[],
  loading: boolean,
  hideSection: boolean
}

export type  topBar = {
  active: boolean,
  title: string | null,
  saveAction: (() => any) | null,
  discardAction: (() => any) | null,
  alignContentFlush: boolean,
  fullWidth: boolean,
  contextControl: string | null,
  secondaryMenu: null,
}
