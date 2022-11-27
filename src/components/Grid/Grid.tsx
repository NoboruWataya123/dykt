import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import { trpc } from '../../utils/trpc';
import ArticleCard from '../Article/Article';

export function ArticlesCardsGrid() {
    const posts = trpc.post.getAll.useQuery({ page: 1 });
    console.log(posts.data);

    return (
        <Container size="xl" py="xl" >
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }, { maxWidth: 'md', cols: 2 }]}>
                {posts.data?.map((article) => (
                    <ArticleCard article={article} />
                ))}
            </SimpleGrid>
        </Container>
    );
}