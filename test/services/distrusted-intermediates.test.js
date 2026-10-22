const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const tls = require('tls');

const { expect } = require('@twilio/cli-test');

const distrusted = require('../../src/services/distrusted-intermediates');

const PEM = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'distrusted-intermediate.pem'), 'utf8');
const KNOWN_SPKI = 'ebed6475c2c2d80fcb199f3fe8dd6e6b3ce60b77eb15d4e42c3dec0c6f5b5105';
const { raw } = new crypto.X509Certificate(PEM);

describe('services', () => {
  describe('distrusted-intermediates', () => {
    it('lists the eight compromised intermediates', () => {
      expect(distrusted.DISTRUSTED_SPKI_SHA256.size).to.equal(8);
    });

    it('hashes the SubjectPublicKeyInfo of a certificate', () => {
      expect(distrusted.spkiSha256(raw)).to.equal(KNOWN_SPKI);
    });

    it('detects a distrusted intermediate anywhere in the chain', () => {
      const root = { raw: new crypto.X509Certificate(tls.rootCertificates[0]).raw };
      root.issuerCertificate = root; // self-referential, like a real root
      const leaf = { raw: root.raw, issuerCertificate: { raw, issuerCertificate: root } };
      expect(distrusted.containsDistrusted(leaf)).to.equal(true);
    });

    it('does not flag a chain without a distrusted certificate', () => {
      expect(distrusted.containsDistrusted({ raw }, new Set(['00']))).to.equal(false);
      expect(distrusted.containsDistrusted({ raw: new crypto.X509Certificate(tls.rootCertificates[0]).raw })).to.equal(
        false,
      );
      expect(distrusted.containsDistrusted(undefined)).to.equal(false);
    });

    it('rejects distrusted chains through tls.checkServerIdentity once installed', () => {
      const original = tls.checkServerIdentity;
      try {
        distrusted.install();
        const error = tls.checkServerIdentity('example.com', { raw });
        expect(error.code).to.equal('ERR_TLS_CERT_DISTRUSTED');
        expect(error.message).to.equal(
          'Certificate chain which you are using contains a distrusted intermediate certificate',
        );
      } finally {
        tls.checkServerIdentity = original;
      }
    });
  });
});
