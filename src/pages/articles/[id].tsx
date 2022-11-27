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
                        <Image src={post.data?.images[0]?.url} alt={post.data?.title} height={600} width={800} radius="md" style={{ objectFit: 'cover' }} />
                    </AspectRatio>
                    <Group position="left" className="bg-gray-300 p-4 my-4">
                        <Title>{post.data?.title}</Title>
                    </Group>
                    <Group position="left" className="bg-gray-200 p-4 my-4">
                        <EditorContent editor={post.data?.content} />

                    </Group>
                </Card>
            </Container>
        </>
    )
}

export default Article