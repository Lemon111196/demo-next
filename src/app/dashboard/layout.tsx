import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";


export default function MainLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>
) {
    return (
        <div>
            <Navbar></Navbar>
            {children}
        </div>
    )
}
