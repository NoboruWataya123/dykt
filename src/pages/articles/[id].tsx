import { AspectRatio, Card, Container, Group, Text, Title } from '@mantine/core'
import { EditorContent } from '@tiptap/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { trpc } from '../../utils/trpc'

const Article = () => {
    const router = useRouter()
    const { id } = router.query
    const post = trpc.post.getOne.useQuery({ id: id as string })

    return (
        <>
            <Container size="lg" py="xl" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Card shadow="sm" radius="md" style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <AspectRatio ratio={16 / 9}>
                        {post.data?.images[0] && (
                            <Image src={post.data?.images[0]?.url ?? 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'} alt={post.data?.title} height={600} width={800} style={{ objectFit: 'cover' }} />
                        )}
                    </AspectRatio>
                    <Group position="left" className="bg-gray-300 p-4 my-4">
                        <Title>{post.data?.title}</Title>
                    </Group>
                    <Group position="left" className="bg-gray-200 p-4 my-4">
                        {post.data?.content && (
                            <p dangerouslySetInnerHTML={{ __html: post.data?.content }}></p>
                        )}
                    </Group>
                </Card>
            </Container>
        </>
    )
}

export default Article