package Classes;

import org.apache.commons.codec.digest.DigestUtils;

public class UtilityPassword {
    public static String getHash(String password){
        return DigestUtils.md5Hex(password).toUpperCase();
    }
    public static boolean isHashEqual(String password, String passwordHash){
        return password.equals(passwordHash);
    }
}
