import {useDispatch} from 'react-redux'
import {onChangeLoading} from "@/redux/actions/layoutActions";

export function useLoading() {
  const dispatch = useDispatch()

  const start = (value = true) => dispatch(onChangeLoading(value))

  const finish = () => start(false)

  return {start, finish}
}
