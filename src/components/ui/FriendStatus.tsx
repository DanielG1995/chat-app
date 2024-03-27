
export const FriendStatus = ({ status }: { status: boolean }) => {
    return (
        <div className={`w-3 h-3 mr-5 rounded-full ${status?'bg-green-500':'bg-red-500'}`} />
            )
}
