#!/usr/bin/env node
/**
 * Git clean filter: 将明文 JS 混淆后输出（用于提交到 GitHub）
 * 用法: git clean filter 从 stdin 读取原始内容，输出混淆后的内容到 stdout
 */
const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');

// 从 stdin 读取全部内容
let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
    try {
        const result = JavaScriptObfuscator.obfuscate(input, {
            compact: true,           // 紧凑输出
            controlFlowFlattening: false,
            deadCodeInjection: false,
            stringArray: true,       // 字符串数组化
            stringArrayThreshold: 0.75,
            stringArrayEncoding: ['rc4'],
            rotateStringArray: true,
            selfDefending: false,
            disableConsoleOutput: false,
            target: 'browser'
        });
        process.stdout.write(result.getObfuscatedCode());
    } catch (e) {
        // 混淆失败时原样输出，避免阻断提交
        process.stderr.write('[obfuscate] Warning: ' + e.message + '\n');
        process.stdout.write(input);
    }
});
