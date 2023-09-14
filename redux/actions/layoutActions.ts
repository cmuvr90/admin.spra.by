import {ComplexAction} from "@shopify/polaris";

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
  message: string | null | { [key: string]: string } = null,
  error: boolean = false,
  duration: number = 3000) => {

  const content = Array.isArray(message) ? message.reverse() : (
    typeof message === 'string' ? [message] : (
      (typeof message === 'object' && message !== null) ? Object.values(message) : []
    )
  )

  return {
    type: ON_CHANGE_MESSAGE,
    payload: {
      content,
      error: error,
      duration: duration,
    },
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
  onClose: undefined,
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
export const onChangeTopBarSecondaryAction = (params: any = {}) => ({
  type: ON_CHANGE_TOP_BAR_SECONDARY_ACTION,
  payload: {...params},
})

export type Modal = {
  fullScreen: boolean,
  large: boolean,
  open: boolean,
  onClose?: () => any,
  title: string | null,
  content: string | null,
  primaryAction?: ComplexAction,
  secondaryActions?: ComplexAction[],
  loading: boolean,
  hideSection: boolean
}

export type TopBar = {
  active: boolean,
  title?: string,
  saveAction?: {
    url?: string;
    content?: string;
    loading?: boolean;
    disabled?: boolean;
    onAction?(): void;
  },
  discardAction?: {
    url?: string;
    content?: string;
    loading?: boolean;
    disabled?: boolean;
    onAction?(): void;
  },
  alignContentFlush: boolean,
  fullWidth: boolean,
  contextControl: string | null,
  secondaryMenu: null,
}


export type Message = {
  content: string[],
  error: false,
  duration: 3000,
}
