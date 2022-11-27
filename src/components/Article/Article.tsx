import { IconBookmark, IconHeart, IconShare } from '@tabler/icons';
import {
    Card,
    Image,
    Text,
    ActionIcon,
    Badge,
    Group,
    Center,
    Avatar,
    createStyles,
} from '@mantine/core';

import Link from 'next/link';
import { ArticleProps } from './ArticleProps';

const useStyles = createStyles((theme) => ({
    card: {
        position: 'relative',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    rating: {
        position: 'absolute',
        top: theme.spacing.xs,
        right: theme.spacing.xs + 2,
        pointerEvents: 'none',
    },

    title: {
        display: 'block',
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.xs / 2,
    },

    action: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        }),
    },

    footer: {
        marginTop: theme.spacing.md,
    },

    image: {
        borderRadius: theme.radius.sm,
    }
}));

export default function ArticleCard(article: ArticleProps | any): JSX.Element {
    const classes = useStyles();
    const articleProps = article.article;

    return (
        <>
            <Card
                key={articleProps.id}
                className={classes.classes.card}
                shadow="sm"
                radius="md"
                style={{ maxWidth: 400 }}
            >
                <Link href={`/articles/${articleProps.id}`}>
                    <Image
                        src={articleProps.images[0].url ?? 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'}
                        alt={articleProps.title}
                        height={200}
                        radius="md"
                        style={{ objectFit: 'cover' }}
                    />
                    <Text className={classes.classes.title} size="xl" weight={500}>
                        {articleProps.title}
                    </Text>
                </Link>

                <Group position="center" className={classes.classes.footer}>
                    <ActionIcon
                        className={classes.classes.action}
                        variant="transparent"
                        color="gray"
                        size="lg"
                        radius="md"
                    >
                        <IconHeart />
                    </ActionIcon>

                    <ActionIcon
                        className={classes.classes.action}
                        variant="transparent"
                        color="gray"
                        size="lg"
                        radius="md"
                    >

                        <IconBookmark />
                    </ActionIcon>

                    <ActionIcon
                        className={classes.classes.action}
                        variant="transparent"
                        color="gray"
                        size="lg"
                        radius="md"
                    >
                        <IconShare />
                    </ActionIcon>
                </Group>
            </Card>
        </>
    );
}

// export function ArticleCard({
//     className,
//     image,
//     link,
//     title,
//     description,
//     author,
//     rating,
//     ...others
// }: ArticleCardProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof ArticleCardProps>) {
//     const { classes, cx, theme } = useStyles();
//     const linkProps = { href: link, target: '_blank', rel: 'noopener noreferrer' };

//     return (
//         <Card withBorder radius="md" className={cx(classes.card, className)} {...others}>
//             <Card.Section>
//                 <a {...linkProps}>
//                     <Image src={image} height={180} />
//                 </a>
//             </Card.Section>

//             <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
//                 {rating}
//             </Badge>

//             <Text className={classes.title} weight={500} component="a" {...linkProps}>
//                 {title}
//             </Text>

//             <Text size="sm" color="dimmed" lineClamp={4}>
//                 {description}
//             </Text>

//             <Group position="apart" className={classes.footer}>
//                 <Center>
//                     <Avatar src={author.image} size={24} radius="xl" mr="xs" />
//                     <Text size="sm" inline>
//                         {author.name}
//                     </Text>
//                 </Center>

//                 <Group spacing={8} mr={0}>
//                     <ActionIcon className={classes.action}>
//                         <IconHeart size={16} color={theme.colors.red[6]} />
//                     </ActionIcon>
//                     <ActionIcon className={classes.action}>
//                         <IconBookmark size={16} color={theme.colors.yellow[7]} />
//                     </ActionIcon>
//                     <ActionIcon className={classes.action}>
//                         <IconShare size={16} />
//                     </ActionIcon>
//                 </Group>
//             </Group>
//         </Card>
//     );
// }