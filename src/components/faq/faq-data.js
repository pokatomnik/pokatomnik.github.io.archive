import React from 'react';

import Link from '../common/link/link';

export default [{
    question: 'What is Pasta?',
    answer: 'Pasta is a web application for sharing source code (or just text).'
}, {
    question: 'Why pasta is secure?',
    answer: 'Currently Pasta 2.0 does not use a backend, so everything you type will be stored in the URL only.'
}, {
    question: 'Which technologies are used for sharing?',
    answer: (
        <span>
            Currently Pasta 2.0 uses&nbsp;
            <a
                href="https://en.wikipedia.org/wiki/Blowfish_(cipher)"
                target="_blank"
                rel="noopener noreferrer"
            >
                Blowfish
            </a>&nbsp;for encryption and&nbsp;
            <a
                href="https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Markov_chain_algorithm"
                target="_blank"
                rel="noopener noreferrer"
            >
                LZMA
            </a>&nbsp;for compression your text data. URL transformations were taken from&nbsp;
            <a
                href="https://github.com/alcor/itty-bitty"
                target="_blank"
                rel="noopener noreferrer"
            >
                this
            </a>&nbsp;repository.
        </span>
    )
}, {
    question: 'How many symbols could shared text contain?',
    answer: (
        <span>
            There are some&nbsp;
            <a
                href="https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers#417184"
                target="_blank"
                rel="noopener noreferrer"
            >
                constraints
            </a>.
        </span>
    )
}, {
    question: 'What if I need to share veeery long text?',
    answer: 'I recommend to share It using open-source archivers (most of them supports encryption as well).'
}, {
    question: 'My URL seems to be broken. What can I do?',
    answer: 'My apologize, I can\'t restore It. Pasta does not store anything on a backend (But I have plans to store recent created links)'
}, {
    question: 'Can I...?',
    answer: (
        <span>
            Send me a&nbsp;
            <Link
                to="/feedback"
                href="https://pokatomnik.github.io/#!/feedback"
            >
                message
            </Link>. It is simple and I'll try to respond soon.
        </span>
    )
}];