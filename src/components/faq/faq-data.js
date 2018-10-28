import React from 'react';

import Link from '../common/link/link';

export default [{
    question: 'What is Pasta?',
    answer: 'Pasta is a web application for sharing source code (or just text).'
}, {
    question: 'Why pasta is secure?',
    answer: (
        <span>
            Pasta 2.0 stores last 50 URLs with encrypted/unencrypted pastas It uses <a
                href="https://backendless.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                Backendless
            </a> for It. Encrypted pastas are still only yours, no one knows your key or unencrypted text
        </span>
    )
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
    answer: (
        <span>
            I recommend to share It using open-source archivers (most of them supports encryption as well).
            Or the <Link to="/file">Encrypt Files</Link> feature.
        </span>
    )
}, {
    question: 'My URL seems to be broken. What can I do?',
    answer: 'My apologize, I can\'t restore It. Pasta does not store something unencrypted on the backend side'
}, {
    question: 'Do I need an account?',
    answer: (
        <span>
            Rather no than yes. Accounts is a not stable feature, It is being tested.
            But If you are interested in It I can create one for you.
            Use <Link to="/feedback">feedback</Link> and leave a message for me.
        </span>
    )
}, {
    question: 'What is accounts feature for?',
    answer: 'I am planning to implement a lot of features later, but now I use them to remember last created pastas (You will see user menu at the right top corner)'
}, {
    question: 'How can I change my avatar?',
    answer: (
        <span>Use <a
            href="https://gravatar.com"
            target="_blank"
            rel="noopener noreferrer"
        >Gravatar</a> please</span>
    )
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