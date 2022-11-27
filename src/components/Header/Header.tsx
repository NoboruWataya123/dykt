import {
    createStyles,
    Header,
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    ActionIcon,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconPlus,
} from '@tabler/icons';
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import Image from 'next/image';

// const { data: sessionData } = useSession();

// const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
// );

const useStyles = createStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan('sm')]: {
            height: 42,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },

    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        }),

        '&:active': theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: -theme.spacing.md,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
            }`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));

const mockdata = [
    {
        icon: IconCode,
        title: 'Open source',
        description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
        icon: IconCoin,
        title: 'Free for everyone',
        description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
        icon: IconBook,
        title: 'Documentation',
        description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
        icon: IconFingerprint,
        title: 'Security',
        description: 'The shell’s rounded shape and the grooves on its.',
    },
    {
        icon: IconChartPie3,
        title: 'Analytics',
        description: 'This Pokémon uses its flying ability to quickly chase',
    },
    {
        icon: IconNotification,
        title: 'Notifications',
        description: 'Combusken battles with the intensely hot flames it spews',
    },
];

export function HeaderMegaMenu() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { classes, theme } = useStyles();
    const { data: sessionData } = useSession();

    const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
        undefined, // no input
        { enabled: sessionData?.user !== undefined },
    );

    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group noWrap align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color={theme.fn.primaryColor()} />
                </ThemeIcon>
                <div>
                    <Text size="sm" weight={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box pb={120}>
            <Header height={60} px="md">
                <Group position="apart" sx={{ height: '100%' }}>
                    <Link href="/">
                        <Image src="/logo.png" alt="logo" width={30} height={30} style={{ marginInline: '8px', display: 'inline', height: 'auto', width: 'auto' }} />
                        <span className='pl-4 font-bold'>Zmtk(2)</span>
                    </Link>
                    <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                        <a href="#" className={classes.link}>
                            Последние публикации
                        </a>
                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <a href="#" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Теги
                                        </Box>
                                        <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                                    </Center>
                                </a>
                            </HoverCard.Target>

                            <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                                <Group position="apart" px="md">
                                    <Text weight={500}>Features</Text>
                                    <Anchor href="#" size="xs">
                                        View all
                                    </Anchor>
                                </Group>

                                <Divider
                                    my="sm"
                                    mx="-md"
                                    color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                                />

                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>

                                <div className={classes.dropdownFooter}>
                                    <Group position="apart">
                                        <div>
                                            <Text weight={500} size="sm">
                                                Get started
                                            </Text>
                                            <Text size="xs" color="dimmed">
                                                Their food sources have decreased, and their numbers
                                            </Text>
                                        </div>
                                        <Button variant="default">Get started</Button>
                                    </Group>
                                </div>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <a href="#" className={classes.link}>
                            О проекте
                        </a>
                        <a href="#" className={classes.link}>
                            Авторы
                        </a>
                    </Group>

                    <Group className={classes.hiddenMobile}>
                        {
                            sessionData ? (
                                <Link href="/articles/create">
                                    <ActionIcon size={40} variant="default" radius="md">
                                        <IconPlus size={22} color={theme.fn.primaryColor()} />
                                    </ActionIcon>
                                    {/* <Button variant='default'>Create post</Button> */}
                                </Link>
                            ) : (
                                <p></p>
                            )
                        }
                        <Button variant="default" onClick={sessionData ? () => signOut() : () => signIn()}>{
                            sessionData ? "Sign out" : "Sign in"}
                        </Button>
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
                </Group>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Zmtk(2)"
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <a href="#" className={classes.link}>
                        Home
                    </a>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component="span" mr={5}>
                                Features
                            </Box>
                            <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <a href="#" className={classes.link}>
                        Learn
                    </a>
                    <a href="#" className={classes.link}>
                        Academy
                    </a>

                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <Group position="center" grow pb="xl" px="md">
                        {/* dont show if not logged in */}
                        {
                            sessionData ? (
                                <Link href="/articles/create">
                                    <ActionIcon size={40} variant="default" radius="md">
                                        <IconPlus size={22} color={theme.fn.primaryColor()} />
                                    </ActionIcon>
                                    {/* <Button variant='default'>Create post</Button> */}
                                </Link>
                            ) : (
                                <p></p>
                            )
                        }
                        <Button variant="default" onClick={sessionData ? () => signOut() : () => signIn()}>{
                            sessionData ? "Sign out" : "Sign in"}
                        </Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}

const AuthShowcase: React.FC = () => {
    const { data: sessionData } = useSession();

    const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
        undefined, // no input
        { enabled: sessionData?.user !== undefined },
    );

    return (
        <div>
            {/* <p className="text-center text-2xl text-white">
                {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
                {secretMessage && <span> - {secretMessage}</span>}
            </p> */}
            <button
                className="rounded-sm w-12 h-4 bg-blue-500 px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-700"
                onClick={sessionData ? () => signOut() : () => signIn()}
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    );
};