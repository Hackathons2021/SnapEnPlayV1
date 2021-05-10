import sys
import numpy as np
import cv2
import skimage.measure


def dist(x, y, z, x1, y1, z1):
    return np.abs(x-x1)+np.abs(y-y1)+np.abs(z-z1)


def getpixel():
    img = cv2.imread(r'./public/images/image.'+sys.argv[1])
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    rgb_planes = cv2.split(img)
    result_norm_planes = []
    for plane in rgb_planes:
        dilated_img = cv2.dilate(plane, np.ones((111, 111), np.uint8))
        bg_img = cv2.medianBlur(dilated_img, 21)
        diff_img = 255 - cv2.absdiff(plane, bg_img)
        norm_img = cv2.normalize(
            diff_img, None, alpha=0, beta=255, norm_type=cv2.NORM_MINMAX, dtype=cv2.CV_8UC1)
        result_norm_planes.append(norm_img)
    result_norm = cv2.merge(result_norm_planes)
    img = result_norm
    kk = np.zeros(
        (int(np.ceil(img.shape[0]/20)), int(np.ceil(img.shape[1]/20)), 3))
    height = int(np.ceil(img.shape[0]/20))
    width = int(np.ceil(img.shape[1]/20))
    np.set_printoptions(threshold=sys.maxsize)
    s = str(kk.shape[0]).zfill(3)+str(kk.shape[1]).zfill(3)+"xy"
    for i in range(3):
        one = img[:, :, i]
        kk[:, :, i] = skimage.measure.block_reduce(one, (20, 20), np.min)
    ans = np.zeros(
        (int(np.ceil(img.shape[0]/20)), int(np.ceil(img.shape[1]/20))))
    for x in range(kk.shape[0]):
        for y in range(kk.shape[1]):
            white = dist(kk[x][y][0], kk[x][y][1], kk[x][y][2], 255, 255, 255)
            red = dist(kk[x][y][0], kk[x][y][1], kk[x][y][2], 0, 0, 255)
            blue = dist(kk[x][y][0], kk[x][y][1], kk[x][y][2], 255, 0, 0)
            green = dist(kk[x][y][0], kk[x][y][1], kk[x][y][2], 0, 255, 0)
            black = dist(kk[x][y][0], kk[x][y][1], kk[x][y][2], 0, 0, 0)
            answer = min(blue, white, red, green, black)
            if answer == white:
                kk[x][y][0] = 255
                kk[x][y][1] = 255
                kk[x][y][2] = 255
                s = s+"1"
                ans[x][y] = 1
            elif answer == red:
                kk[x][y][0] = 0
                kk[x][y][1] = 0
                kk[x][y][2] = 255
                s = s+"2"
                ans[x][y] = 2
            elif answer == blue:
                kk[x][y][0] = 255
                kk[x][y][1] = 0
                kk[x][y][2] = 0
                s = s+"3"
                ans[x][y] = 3
            elif answer == green:
                kk[x][y][0] = 0
                kk[x][y][1] = 255
                kk[x][y][2] = 0
                s = s+"4"
                ans[x][y] = 4
            elif answer == black:
                kk[x][y][0] = 0
                kk[x][y][1] = 0
                kk[x][y][2] = 0
                s = s+"5"
                ans[x][y] = 5
    print(s)


getpixel()
