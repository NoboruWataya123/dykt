import { createStyles, Container, Group, Anchor } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import Image from 'next/image';

const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: 120,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));

interface FooterSimpleProps {
    links: { link: string; label: string }[];
}

export function FooterSimple({ links }: FooterSimpleProps) {
    const { classes } = useStyles();
    const items = links.map((link) => (
        <Anchor<'a'>
            color="dimmed"
            key={link.label}
            href={link.link}
            onClick={(event) => event.preventDefault()}
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Group className='ml-4' position="apart" sx={{ height: '100%' }}>
                    <Image src="/logo.png" alt="logo" width={30} height={30} style={{ height: 'auto', width: 'auto' }} />
                    Zmtk(2)
                </Group>
                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    );
}