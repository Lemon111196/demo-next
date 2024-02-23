
import BackgroundImg from '@/src/components/bgAuth'
import styles from './img.module.css'

export default function AuthLayout({
    children }: {
        children: React.ReactNode
    }) {
    return (
        <div className={styles.container}>
            <BackgroundImg></BackgroundImg>
            {children}
        </div>
    )
}
