// $ clang++-5.0 -o pbkdf2-for-zack pbkdf2-for-zack.c++ -std=c++17
//       -L$HOME/src/edgeworker/deps/boringssl/build/x64.release/ssl
//       -L$HOME/src/edgeworker/deps/boringssl/build/x64.release/crypto
//       -lssl -lcrypto
//       -I$PWD/src/edgeworker/deps/boringssl/include
//       -pthread
 
#include <iostream>
#include <iomanip>
#include <random>
 
#include <cstdint>
 
#include <openssl/evp.h>
 
int main() {
  const auto hashType = EVP_sha512();
  constexpr auto iterations = 15'000;
  constexpr auto bitLength = 256;
 
  constexpr auto byteLength = bitLength / 8;
 
  int rc;
 
  std::random_device rd;  // Uses RDRND instruction or /dev/urandom
  std::uniform_int_distribution<uint8_t> d;
 
  uint8_t salt[16];
  for (auto& b: salt) b = d(rd);
 
  uint8_t password[16];
  for (auto& b: password) b = d(rd);
 
  uint8_t output[byteLength];
 
  rc = PKCS5_PBKDF2_HMAC(
    reinterpret_cast<char*>(password), sizeof(password),
    salt, sizeof(salt),
    iterations, hashType,
    byteLength, output);
  if (rc != 1) {
    std::cerr << "PKCS5_PBKDF2_HMAC failed for some reason or another.\n";
    return 1;
  }
 
  for (auto b: output) {
    std::cout << std::hex << std::setw(2) << std::setfill('0') << uint16_t(b);
  }
  std::cout << std::endl;
 
  return 0;
}
