import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import { useEffect, useState } from 'react';
import { trpc } from '../../utils/trpc';
import ArticleCard from '../Article/Article';

const useStyles = createStyles((theme) => ({
    card: {
        transition: 'transform 150ms ease, box-shadow 150ms ease',

        '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: theme.shadows.md,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 600,
    },
}));

export function ArticlesCardsGrid() {
    const { classes } = useStyles();
    const posts = trpc.post.getAll.useQuery({ page: 1 });
    console.log(posts.data);

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (posts.data) {
            setArticles(posts.data);
        }
    }, [posts.data]);

    return (
        <Container size="xl" py="xl" >
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }, { maxWidth: 'md', cols: 2 }]}>
                {articles.map((article) => (
                    <ArticleCard key={article.id} {...article} />
                ))}
            </SimpleGrid>
        </Container>
    );
}