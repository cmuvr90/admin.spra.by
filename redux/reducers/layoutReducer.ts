import {
  ON_CHANGE_LOADING,
  ON_CHANGE_MESSAGE,

  ON_CHANGE_MODAL,
  ON_CHANGE_MODAL_PRIMARY_ACTION,
  ON_CHANGE_MODAL_SECONDARY_ACTION,

  ON_CHANGE_TOP_BAR,
  ON_CHANGE_TOP_BAR_PRIMARY_ACTION,
  ON_CHANGE_TOP_BAR_SECONDARY_ACTION,

  Message, Modal, TopBar,
} from '../actions/layoutActions'

/**
 *
 */
const initialState: LayoutState = {
  loading: false,
  message: {
    content: [],
    error: false,
    duration: 3000,
  },
  modal: {
    large: false,
    open: false,
    title: null,
    content: null,
    primaryAction: null,
    secondaryActions: [],
    loading: false,
    hideSection: false
  },
  topBar: {
    title: 'Save changes?',
    active: false,
    alignContentFlush: true,
    fullWidth: true,
    contextControl: null,
    secondaryMenu: null,
  },
}

/**
 *
 * @param state
 * @param action
 */
export const layoutReducer = (state = initialState, action: {type: any; payload: {[key: string | number]: any}}) => {
  switch (action.type) {
    case ON_CHANGE_LOADING:
      return {...state, loading: action.payload}
    case ON_CHANGE_MESSAGE:
      return {...state, message: action.payload}
    case ON_CHANGE_MODAL:
      return {...state, modal: {...state.modal, ...action.payload}}
    case ON_CHANGE_MODAL_PRIMARY_ACTION:
      return {
        ...state,
        modal: {
          ...state.modal,
          primaryAction: {
            ...state.modal.primaryAction,
            ...action.payload,
          },
        },
      }
    case ON_CHANGE_MODAL_SECONDARY_ACTION:
      return {
        ...state,
        modal: {
          ...state.modal,
          secondaryActions: state.modal.secondaryActions.map((i, index) =>
            index === action.payload.index - 1 ? {...i, ...action.payload.value} : {...i}),
        },
      }
    case ON_CHANGE_TOP_BAR:
      return {...state, topBar: {...state.topBar, ...action.payload}}
    case ON_CHANGE_TOP_BAR_PRIMARY_ACTION:
      return {
        ...state,
        topBar: {
          ...state.topBar,
          saveAction: {
            ...state.topBar.saveAction,
            ...action.payload,
          },
        },
      }
    case ON_CHANGE_TOP_BAR_SECONDARY_ACTION:
      return {
        ...state,
        topBar: {
          ...state.topBar,
          discardAction: {
            ...state.topBar.discardAction,
            ...action.payload,
          },
        },
      }
    default:
      return state
  }
}

export type LayoutState = {
  loading: boolean,
  message: Message,
  modal: Modal,
  topBar: TopBar,
}
