import forge from "node-forge";

const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtTzz8//tA0e6zwCSerIQ
G7F+WMj4CK/ARdWX1f8IMzPGCtlkZ61c06QHVTZPsfZZZwiVJoRPf8uOeXBxcZMQ
H0EVgDqMJP00ykdwkhM8mNqSHCGcnFmOoNaFj2+mtVtM9lRGXhC9p6er+KytiL8G
OeoSMcpXOKOWY4kiXuvkqCcCavCtdBRvyudB0sgHfYeK16OoqSWyEj/bS7s3vuRm
R1OIT1AqhBMlhsNx3XejqRoE9l+RfhpsHOGX3CSW8XP9HrD5XMb1efcyG0HbmEha
P6WmJNUsQLIkUN78Z+t/8PbqC692tKeriSudyPy7Y3BtNuTOVxrjy9F7E9xwUAvu
awIDAQAB
-----END PUBLIC KEY-----
`;

export const encryptData = (data: string): string => {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encrypted = publicKey.encrypt(data, "RSA-OAEP");
  return forge.util.encode64(encrypted);
};
