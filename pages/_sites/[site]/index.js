import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getStaticPaths() {
    const paths = [{ params: { site: "test" } }, { params: { site: "test2" } }];

    return {
        paths: paths,
        fallback: "blocking",
    };
}

export const getStaticProps = async (context) => {
    const data = [
        { domain: "test", data: "My first test project" },
        { domain: "test2", data: "My second test project" },
    ];

    // const project = data.find((p) => p.domain === context.params.site);
    var name = context.params.site.split(".")[0]
    // const userData = fetch(`https://api.github.com/users/${name}`)
    //     .then(({ data }) => {

    //         return data;
    //         myData = data;
    //     }).catch(err => console.log(err))
    const res = await fetch(`https://api.github.com/users/${name}`)
    const user = await res.json()

    if (!user.login) return {
        redirect: {
            destination: "/404",
        }
    }
    return {
        props: {
            project: user
        },
    };
};
export default function Index({ project }) {
    console.log(project)
    const router = useRouter()

    return (
        <>
            <h1>Hello {project.login}</h1>

        </>
    );

}