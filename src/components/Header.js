// Header.js
import Link from 'next/link';
import { Box, Container, Typography, Link, Grid, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Header() {
    return (
        <header>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/app">App</Link>
            </nav>
        </header>
    );
}