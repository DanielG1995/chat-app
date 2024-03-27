import { AnimatePresence, motion } from "framer-motion"
import useChatStore from "../../store/store"

export const Loading = () => {

    const { loading } = useChatStore()

    return (
        <AnimatePresence>

            {loading && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='transition-all duration-[320ms]'
            >
                <div className='absolute top-0 left-0 w-full h-full opacity-10 z-[100] bg-black'></div>
                <div className='absolute w-full h-full flex flex-col gap-5 top-0 left-0 justify-center items-center text-[40px]'>
                    Loading...
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                        <g stroke="currentColor">
                            <circle cx="12" cy="12" r="9.5" fill="none" strokeLinecap="round" strokeWidth="3">
                                <animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150" />
                                <animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59" />
                            </circle>
                            <animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                        </g>
                    </svg>
                </div>
            </motion.div>
            }
        </AnimatePresence>
    )
}
