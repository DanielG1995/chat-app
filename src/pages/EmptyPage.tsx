import useChatStore from "../store/store"

export const EmptyPage = () => {
  const { userId } = useChatStore()
  return (
    <div className="flex items-center justify-center grow text-[48px]">{userId}</div>
  )
}
