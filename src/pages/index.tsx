import { type NextPage } from "next";

import { ArticlesCardsGrid } from "../components/Grid/Grid";
import { FooterSimple } from "../components/Footer/Footer";

const Page: NextPage = () => {
    return (
        <>
            <ArticlesCardsGrid />
            <FooterSimple links={[{ link: "#", label: "Link 1" }]} />
        </>
    );
};

export default Page;

// const AuthShowcase: React.FC = () => {
//     const { data: sessionData } = useSession();

//     const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
//         undefined, // no input
//         { enabled: sessionData?.user !== undefined },
//     );

//     return (
//         <div className="flex flex-col items-center justify-center gap-4">
//             <p className="text-center text-2xl text-white">
//                 {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//                 {secretMessage && <span> - {secretMessage}</span>}
//             </p>
//             <button
//                 className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//                 onClick={sessionData ? () => signOut() : () => signIn()}
//             >
//                 {sessionData ? "Sign out" : "Sign in"}
//             </button>
//         </div>
//     );
// };

