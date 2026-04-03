import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Box, Button } from '@mui/material';
import FormatBoldOutlinedIcon from '@mui/icons-material/FormatBoldOutlined';
import FormatItalicOutlinedIcon from '@mui/icons-material/FormatItalicOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import { colors } from '../../../services';
import { useEffect } from 'react';

const TiptapEditor = ({ content, setContent }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
    });

    // ✅ Sync content when it arrives (e.g. after API fetch)
    useEffect(() => {
        if (!editor || !content) return;

        // Avoid resetting if editor already has the same content
        const current = editor.getHTML();
        if (current === content) return;

        // Move cursor to end after setting content
        editor.commands.setContent(content, false);
    }, [content, editor]);

    if (!editor) return null;

    return (
        <Box>
            {/* Toolbar */}
            <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button onClick={() => editor.chain().focus().toggleBold().run()} sx={{ color: colors.iconColor_11 }}>
                    <FormatBoldOutlinedIcon />
                </Button>
                <Button onClick={() => editor.chain().focus().toggleItalic().run()} sx={{ color: colors.iconColor_11 }}>
                    <FormatItalicOutlinedIcon />
                </Button>
                <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} sx={{ fontWeight: 'bold', color: colors.iconColor_11 }}>
                    H1
                </Button>
                <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} sx={{ fontWeight: 'bold', color: colors.iconColor_11 }}>
                    H2
                </Button>
                <Button onClick={() => editor.chain().focus().toggleBulletList().run()} sx={{ color: colors.iconColor_11 }}>
                    <FormatListBulletedOutlinedIcon />
                </Button>
                <Button onClick={() => editor.chain().focus().toggleOrderedList().run()} sx={{ color: colors.iconColor_11 }}>
                    <FormatListNumberedOutlinedIcon />
                </Button>
            </Box>

            {/* Editor */}
            <Box
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '10px',
                    minHeight: '200px',

                    // 🔥 Target Tiptap editor
                    '& .ProseMirror': {
                        outline: 'none',
                        border: 'none',
                        boxShadow: 'none',
                    },

                    '& .ProseMirror:focus': {
                        outline: 'none',
                        border: 'none',
                        boxShadow: 'none',
                    },

                    '& .ProseMirror-focused': {
                        outline: 'none',
                        border: 'none',
                        boxShadow: 'none',
                    },

                    // 🔥 Remove parent focus effect too (if any)
                    '&:focus-within': {
                        border: '1px solid #ccc',
                    },
                }}
            >
                <EditorContent editor={editor} style={{ maxWidth: '950px' }} />
            </Box>
        </Box>
    );
};

export default TiptapEditor;