import {useDispatch} from 'react-redux'
import {onChangeMessage} from "@/redux/actions/layoutActions";

export function useMessage() {
  const dispatch = useDispatch()

  /**
   *
   * @param value
   * @param duration
   */
  const info = (value: string = '', duration: number = 3000) => dispatch(onChangeMessage(value, false, duration))

  /**
   *
   * @param value
   * @param duration
   */
  const error = (value: string = '', duration: number = 3000) => dispatch(onChangeMessage(value, true, duration))

  /**
   *
   */
  const close = () => dispatch(onChangeMessage())

  return {info, error, close}
}
