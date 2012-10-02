/*
 * need octals, so not JSON
 */
module.exports = {
    P: 0x50, K: 0x4b,
    LOCAL_FILE_HEADER_SIG:          0x04034b50,
    LOCAL_FILE_HEADER_MINSIZE:      30,
    DATA_DESCRIPTOR_SIG:            0x08074b50,
    CENTRAL_DIR_FILE_HEADER_SIG:    0x02014b50,
    END_CENTRAL_DIR_SIG:            0x06054b50,
    COMPRESSION_METHODS: {          // hash not array, since it's not sequential
        '0': 'NONE', // stored with no compression
        '1': 'SHRUNK',
        '2': 'REDUCED W COMPRESSION 1',
        '3': 'REDUCED W COMPRESSION 2',
        '4': 'REDUCED W COMPRESSION 3',
        '5': 'REDUCED W COMPRESSION 4',
        '6': 'IMPLODE',
        '7': 'Reserved for Tokenizing compression algorithm',
        '8': 'DEFLATE',
        '9': 'DEFLATE64 (TM)',
        '10': 'PKWARE Data Compression Library Imploding (old IBM TERSE)',
        '11': 'PKWARE RESERVED',
        '12': 'BZIP2',
        '13': 'PKWARE RESERVED',
        '14': 'LZMA (EFS)',
        '15': 'PKWARE RESERVED',
        '16': 'PKWARE RESERVED',
        '17': 'PKWARE RESERVED',
        '18': 'IBM TERSE (new)',
        '19': 'IBM LZ77 z Architecture (PFS)',
        '97': 'WAVPACK',
        '98': 'PPMD V1 R1'
    }
}
