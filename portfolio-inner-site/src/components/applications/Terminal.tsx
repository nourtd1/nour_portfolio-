import React, { useEffect, useRef, useState } from 'react';
import Window from '../os/Window';
import projects from '../../data/projects';
import { bio, contact, identity, stats } from '../../data/info';
import skills from '../../data/skills';

export interface TerminalAppProps extends WindowAppProps {}

interface Line {
    text: string;
    type: 'input' | 'output' | 'accent' | 'error' | 'dim';
}

const PROMPT = 'nour@nourdev:~$';

const ALL_COMMANDS = [
    'help', 'neofetch', 'whoami', 'ls', 'cat',
    'open', 'contact', 'skills', 'experience', 'stats',
    'social', 'clear',
];

const HELP_LINES: string[] = [
    '',
    '  COMMANDS',
    '  ─────────────────────────────────────────',
    '  neofetch           system info (the cool way)',
    '  whoami             who I am in one line',
    '  cat bio.txt        full bio',
    '  stats              key numbers',
    '  skills             technology stack',
    '  experience         work & education',
    '  social             all links',
    '  contact            email, phone, socials',
    '  ls                 browse files',
    '  ls projects/       list all projects',
    '  open <project>     open a project link',
    '  clear              clear screen',
    '',
    '  TIPS',
    '  ─────────────────────────────────────────',
    '  ↑ / ↓   navigate command history',
    '  Tab     autocomplete command',
    '',
];

const NEOFETCH_LINES: Line[] = [
    { text: '', type: 'output' },
    { text: '  ███╗   ██╗ ██████╗ ██╗   ██╗██████╗', type: 'accent' },
    { text: '  ████╗  ██║██╔═══██╗██║   ██║██╔══██╗', type: 'accent' },
    { text: '  ██╔██╗ ██║██║   ██║██║   ██║██████╔╝', type: 'accent' },
    { text: "  ██║╚██╗██║██║   ██║██║   ██║██╔══██╗", type: 'accent' },
    { text: "  ██║ ╚████║╚██████╔╝╚██████╔╝██║  ██║", type: 'accent' },
    { text: '  ╚═╝  ╚═══╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝', type: 'accent' },
    { text: '', type: 'output' },
    { text: `  nour@nourdev`, type: 'accent' },
    { text: `  ─────────────────────────────────────`, type: 'dim' },
    { text: `  OS       NourOS v2026`, type: 'output' },
    { text: `  Host     ${identity.location}`, type: 'output' },
    { text: `  Origin   ${identity.origin}`, type: 'output' },
    { text: `  Role     ${identity.title}`, type: 'output' },
    { text: `  Focus    React Native · Next.js · Supabase`, type: 'output' },
    { text: `  Status   ${identity.availability}`, type: 'accent' },
    { text: '', type: 'output' },
    { text: `  ████ ████ ████ ████ ████ ████ ████ ████`, type: 'accent' },
    { text: '', type: 'output' },
];

const EXPERIENCE_LINES: Line[] = [
    { text: '', type: 'output' },
    { text: '  EXPERIENCE', type: 'accent' },
    { text: '  ─────────────────────────────────────', type: 'dim' },
    { text: '  ChadNova (Remote) · Software Developer', type: 'output' },
    { text: '    Mobile/web, MTN MoMo, offline-first apps', type: 'dim' },
    { text: '    ID: CN-DEV-006 · Present', type: 'dim' },
    { text: '', type: 'output' },
    { text: '  Independent Founder · Gisenyi, Rwanda', type: 'output' },
    { text: '    8 live products · 4 published apps', type: 'dim' },
    { text: '    App Store & Google Play · 3+ years', type: 'dim' },
    { text: '', type: 'output' },
    { text: '  EDUCATION', type: 'accent' },
    { text: '  ─────────────────────────────────────', type: 'dim' },
    { text: '  Kigali Independent University', type: 'output' },
    { text: '    BSc Software Engineering · Final year', type: 'dim' },
    { text: '', type: 'output' },
    { text: '  Harvard CS50 Python · Certified', type: 'output' },
    { text: '  PBEEE candidate', type: 'dim' },
    { text: '', type: 'output' },
];

const findProject = (query: string) => {
    const q = query.trim().toLowerCase();
    return projects.find(
        (p) => p.id.includes(q) || p.name.toLowerCase().includes(q)
    );
};

const TerminalApp: React.FC<TerminalAppProps> = (props) => {
    const [lines, setLines] = useState<Line[]>([
        { text: '╔════════════════════════════════════════════╗', type: 'accent' },
        { text: '║  NOUR OS v2026  ·  Terminal.exe             ║', type: 'accent' },
        { text: '╚════════════════════════════════════════════╝', type: 'accent' },
        { text: `  ${identity.fullName}`, type: 'output' },
        { text: `  ${identity.title}`, type: 'dim' },
        { text: '', type: 'output' },
        { text: "  Type 'help' for commands, 'neofetch' for system info.", type: 'dim' },
        { text: '', type: 'output' },
    ]);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [historyIdx, setHistoryIdx] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [lines]);

    const print = (newLines: Line[]) => {
        setLines((prev) => [...prev, ...newLines]);
    };

    const runCommand = (raw: string) => {
        const command = raw.trim();
        const [cmd, ...args] = command.split(/\s+/);
        const arg = args.join(' ');

        print([{ text: `${PROMPT} ${command}`, type: 'input' }]);

        if (command !== '') {
            setHistory((h) => [command, ...h].slice(0, 50));
            setHistoryIdx(-1);
        }

        if (command === '') return;

        switch (cmd.toLowerCase()) {
            case 'help':
                print(HELP_LINES.map((text) => ({ text, type: 'output' as const })));
                break;

            case 'neofetch':
                print(NEOFETCH_LINES);
                break;

            case 'whoami':
                print([
                    { text: `  ${identity.fullName}`, type: 'accent' },
                    { text: `  ${identity.title} · ${identity.location}`, type: 'output' },
                    { text: `  Originally from ${identity.origin}`, type: 'dim' },
                    { text: '', type: 'output' },
                ]);
                break;

            case 'stats':
                print([
                    { text: '', type: 'output' },
                    { text: '  STATS', type: 'accent' },
                    { text: '  ─────────────────────────────────────', type: 'dim' },
                    ...stats.map((s) => ({
                        text: `  ${s.value.padEnd(6)} ${s.label}`,
                        type: 'output' as const,
                    })),
                    { text: '', type: 'output' },
                ]);
                break;

            case 'skills': {
                print([{ text: '', type: 'output' }, { text: '  SKILLS', type: 'accent' }, { text: '  ─────────────────────────────────────', type: 'dim' }]);
                skills.forEach((cat) => {
                    print([
                        { text: `  ${cat.category}`, type: 'accent' },
                        { text: `    ${cat.items.join('  ·  ')}`, type: 'output' },
                    ]);
                });
                print([{ text: '', type: 'output' }]);
                break;
            }

            case 'experience':
                print(EXPERIENCE_LINES);
                break;

            case 'social':
                print([
                    { text: '', type: 'output' },
                    { text: '  LINKS', type: 'accent' },
                    { text: '  ─────────────────────────────────────', type: 'dim' },
                    { text: `  GitHub     ${contact.github}`, type: 'output' },
                    { text: `  LinkedIn   ${contact.linkedin}`, type: 'output' },
                    { text: `  YouTube    ${contact.youtube}`, type: 'output' },
                    { text: `  App Store  ${contact.appStore}`, type: 'output' },
                    { text: '', type: 'output' },
                ]);
                break;

            case 'ls': {
                if (arg.replace(/\/$/, '').toLowerCase() === 'projects') {
                    print([
                        { text: '', type: 'output' },
                        { text: '  PROJECTS', type: 'accent' },
                        { text: '  ─────────────────────────────────────', type: 'dim' },
                        ...projects.map((p) => ({
                            text: `  ${p.id.padEnd(28)} ${p.statusEmoji}  ${p.status}`,
                            type: 'output' as const,
                        })),
                        { text: '', type: 'output' },
                        { text: "  Use 'open <project-id>' to open a project.", type: 'dim' },
                        { text: '', type: 'output' },
                    ]);
                } else {
                    print([
                        { text: '', type: 'output' },
                        { text: '  projects/   bio.txt   skills.json   contact.json', type: 'output' },
                        { text: '', type: 'output' },
                    ]);
                }
                break;
            }

            case 'cat':
                if (arg.toLowerCase() === 'bio.txt') {
                    print([
                        { text: '', type: 'output' },
                        { text: bio, type: 'output' },
                        { text: '', type: 'output' },
                    ]);
                } else {
                    print([{ text: `  cat: ${arg}: No such file`, type: 'error' }]);
                }
                break;

            case 'open': {
                const project = findProject(arg);
                if (!project) {
                    print([
                        { text: `  open: '${arg}' not found.`, type: 'error' },
                        { text: "  Try 'ls projects/' for a full list.", type: 'dim' },
                        { text: '', type: 'output' },
                    ]);
                    break;
                }
                if (project.links.length === 0) {
                    print([
                        { text: `  ${project.name} — no public link yet (${project.status}).`, type: 'output' },
                        { text: '', type: 'output' },
                    ]);
                    break;
                }
                const url = project.links[0].url;
                print([
                    { text: `  Opening ${project.name}`, type: 'accent' },
                    { text: `  → ${url}`, type: 'dim' },
                    { text: '', type: 'output' },
                ]);
                window.open(url, '_blank', 'noopener,noreferrer');
                break;
            }

            case 'contact':
                print([
                    { text: '', type: 'output' },
                    { text: '  CONTACT', type: 'accent' },
                    { text: '  ─────────────────────────────────────', type: 'dim' },
                    { text: `  email    ${contact.email}`, type: 'output' },
                    { text: `  phone    ${contact.phone}`, type: 'output' },
                    { text: `  github   ${contact.github}`, type: 'output' },
                    { text: `  linkedin ${contact.linkedin}`, type: 'output' },
                    { text: `  youtube  ${contact.youtube}`, type: 'output' },
                    { text: '', type: 'output' },
                ]);
                break;

            case 'clear':
                setLines([]);
                break;

            default:
                print([
                    { text: `  command not found: ${cmd}`, type: 'error' },
                    { text: "  Type 'help' to see available commands.", type: 'dim' },
                    { text: '', type: 'output' },
                ]);
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            runCommand(input);
            setInput('');
            setHistoryIdx(-1);
            return;
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const nextIdx = Math.min(historyIdx + 1, history.length - 1);
            setHistoryIdx(nextIdx);
            setInput(history[nextIdx] ?? '');
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIdx = Math.max(historyIdx - 1, -1);
            setHistoryIdx(nextIdx);
            setInput(nextIdx === -1 ? '' : history[nextIdx]);
            return;
        }

        if (e.key === 'Tab') {
            e.preventDefault();
            if (!input.trim()) return;
            const match = ALL_COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
            if (match) setInput(match);
            return;
        }
    };

    const lineClass = (type: Line['type']) => {
        switch (type) {
            case 'accent': return 'terminal__success';
            case 'error':  return 'terminal__error';
            case 'input':  return 'terminal__cmd';
            case 'dim':    return 'terminal__dim';
            default:       return 'terminal__out';
        }
    };

    return (
        <Window
            top={40}
            left={120}
            width={700}
            height={500}
            windowBarIcon="windowExplorerIcon"
            windowTitle="Terminal.exe"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'(c) 2026 Annour Mahamat Abdoulaye'}
        >
            <div
                className="terminal"
                style={styles.terminal}
                onMouseDown={() => inputRef.current?.focus()}
            >
                {lines.map((line, i) => (
                    <pre key={i} className={lineClass(line.type)} style={styles.line}>
                        {line.text || ' '}
                    </pre>
                ))}
                <div className="terminal__line" style={styles.inputRow}>
                    <span className="terminal__prompt" style={styles.prompt}>{PROMPT}</span>
                    <input
                        ref={inputRef}
                        className="terminal__cmd"
                        style={styles.input}
                        value={input}
                        autoFocus
                        spellCheck={false}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    terminal: {
        width: '100%',
        height: '100%',
        backgroundColor: '#05080f',
        padding: '16px 20px',
        boxSizing: 'border-box',
        flexDirection: 'column',
        overflowY: 'scroll',
        cursor: 'text',
    },
    line: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 12.5,
        lineHeight: 1.75,
        margin: 0,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    },
    inputRow: {
        alignItems: 'center',
        marginTop: 4,
    },
    prompt: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 12.5,
        color: '#00C896',
        marginRight: 8,
        flexShrink: 0,
    },
    input: {
        flex: 1,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        color: '#F0F0F0',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 12.5,
        padding: 0,
        borderRadius: 0,
    },
};

export default TerminalApp;
