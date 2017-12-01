/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * 
 */

var assert = require('assert');

describe('read 4-bit file from disk and write to new file (different APDCM source)', function() {
    
    let fs = require("fs");
    let WaveFile = require("../../index.js");
    let path = "test/files/";
    
    let wBytes = fs.readFileSync(path + "4-bit-imaadpcm-8kHz-noBext-mono-reaper.wav");
    let wav = new WaveFile(wBytes);
    let wav2 = new WaveFile(wav.toBuffer());
    fs.writeFileSync(path + "/out/4-bit-imaadpcm-8kHz-noBext-mono-reaper.wav", wav2.toBuffer());

    it("chunkId should be 'RIFF'",
            function() {
        assert.equal(wav2.chunkId, "RIFF");
    });
    it("fmtChunkId should be 'fmt '",
            function() {
        assert.equal(wav2.fmtChunkId, "fmt ");
    });
    it("format should be 'WAVE'",
            function() {
        assert.equal(wav2.format, "WAVE");
    });
    it("fmtChunkSize should be 20",
            function() {
        assert.equal(wav2.fmtChunkSize, 20);
    });
    it("audioFormat should be 17 (IMA ADPCM)",
            function() {
        assert.equal(wav2.audioFormat, 17);
    });
    it("numChannels should be 1",
            function() {
        assert.equal(wav2.numChannels, 1);
    });
    it("sampleRate should be 8000",
            function() {
        assert.equal(wav2.sampleRate, 8000);
    });
    it("byteRate should be 4000",
            function() {
        assert.equal(wav2.byteRate, 4000);
    });
    it("blockAlign should be 1024",
            function() {
        assert.equal(wav2.blockAlign, 1024);
    });
    it("bitsPerSample should be 4",
            function() {
        assert.equal(wav2.bitsPerSample, 4);
    });
    it("factChunkId should be 'fact'",
            function() {
        assert.equal(wav2.factChunkId, 'fact');
    });
    it("wav.factChunkSize should == wav2.factChunkSize",
            function() {
        console.log(wav.factChunkSize);
        assert.equal(wav2.factChunkSize, wav.factChunkSize);
    });
    it("wav.dwSampleLength should == wav2.dwSampleLength",
            function() {
        console.log(wav.dwSampleLength);
        assert.deepEqual(wav2.dwSampleLength, wav.dwSampleLength);
    });
    it("dataChunkId should be 'data'",
            function() {
        assert.equal(wav2.dataChunkId, 'data');
    });
    it("dataChunkSize should be > 0",
            function() {
        assert.ok(wav2.dataChunkSize > 0);
    });
    it("samples.length should be > 0",
            function() {
        assert.ok(wav2.samples_.length > 0);
    });
    it("samples_ on the new file should have the same length as in the original file",
            function() {
        assert.equal(wav2.samples_.length, wav.samples_.length);
    });
    it("samples_ on the new file should be same as the original file",
            function() {
        assert.deepEqual(wav2.samples_, wav.samples_);
    });
});
