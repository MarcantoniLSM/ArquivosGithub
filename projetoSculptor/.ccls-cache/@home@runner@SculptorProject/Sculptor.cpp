#include "Sculptor.hpp"
/**
 * @brief Construtor da classe Sculptor.
 *
 * @param _nx Número de voxels no eixo x.
 * @param _ny Número de voxels no eixo y.
 * @param _nz Número de voxels no eixo z.
 */
Sculptor::Sculptor(int _nx,int _ny, int _nz){
  
    nx = _nx;
    ny = _ny;
    nz = _nz;
    
    v = new Voxel**[nx];
    for (int i = 0; i < nx; i++) {
        v[i] = new Voxel*[ny];
        for (int j = 0; j < ny; j++) {
            v[i][j] = new Voxel[nz];
        }
    }
};
/**
 * @brief Destrutor da classe Sculptor.
 */
Sculptor::~Sculptor(){
    for (int i = 0; i < nx; i++) {
        for (int j = 0; j < ny; j++) {
            delete[] v[i][j];
        }
        delete[] v[i];
    }
    delete[] v;
};
/**
 * @brief Define a cor atual do desenho.
 *
 * @param r Valor da cor vermelha (0 a 1).
 * @param g Valor da cor verde (0 a 1).
 * @param b Valor da cor azul (0 a 1).
 * @param alpha Valor da transparência (0 a 1).
 */
void Sculptor::setColor(float r, float g, float b, float alpha){
  for (int x = 0; x < nx; x++) {
        for (int y = 0; y < ny; y++) {
            for (int z = 0; z < nz; z++) {
                v[x][y][z].r = r;
                v[x][y][z].g = g;
                v[x][y][z].b = b;
                v[x][y][z].a = alpha;
            }
        }
    }
};
/**
 * @brief Ativa um voxel na posição (x, y, z).
 *
 * @param x Posição no eixo x.
 * @param y Posição no eixo y.
 * @param z Posição no eixo z.
 */
void Sculptor::putVoxel(int x, int y, int z){
  v[x][y][z].show = true;
};
/**
 * @brief Desativa um voxel na posição (x, y, z).
 *
 * @param x Posição no eixo x.
 * @param y Posição no eixo y.
 * @param z Posição no eixo z.
 */
void Sculptor::cutVoxel(int x, int y, int z){
  v[x][y][z].show = false;
};
/**
 * @brief Ativa um conjunto de voxels formando um cubo delimitado pelas coordenadas (x0, x1, y0, y1, z0, z1).
 *
 * @param x0 Posição x do canto inferior esquerdo.
 * @param x1 Posição x do canto superior direito.
 * @param y0 Posição y do canto inferior esquerdo.
 * @param y1 Posição y do canto superior direito.
 * @param z0 Posição z do canto inferior esquerdo.
 * @param z1 Posição z do canto superior direito.
 */
void Sculptor::putBox(int x0, int x1, int y0, int y1, int z0, int z1){
  if (x0 < 0 || x1 >= nx || y0 < 0 || y1 >= ny || z0 < 0 || z1 >= nz) {
        return;
    }
  
  for (int x = x0; x <= x1; x++) {
        for (int y = y0; y <= y1; y++) {
            for (int z = z0; z <= z1; z++) {
                putVoxel(x, y, z);
            }
        }
    }
};
/**
 * @brief Desativa um conjunto de voxels formando um cubo delimitado pelas coordenadas (x0, x1, y0, y1, z0, z1).
 *
 * @param x0 Posição x do canto inferior esquerdo.
 * @param x1 Posição x do canto superior direito.
 * @param y0 Posição y do canto inferior esquerdo.
 * @param y1 Posição y do canto superior direito.
 * @param z0 Posição z do canto inferior esquerdo.
 * @param z1 Posição z do canto superior direito.
 */
void Sculptor::cutBox(int x0, int x1, int y0, int y1, int z0, int z1){
  if (x0 < 0 || x1 >= nx || y0 < 0 || y1 >= ny || z0 < 0 || z1 >= nz) {
        return;
    }
  
  for (int x = x0; x <= x1; x++) {
        for (int y = y0; y <= y1; y++) {
            for (int z = z0; z <= z1; z++) {
                cutVoxel(x, y, z);
            }
        }
    }
};
/**
 * @brief Ativa um conjunto de voxels formando uma esfera centrada em (xcenter, ycenter, zcenter) com raio 'radius'.
 *
 * @param xcenter Coordenada x do centro da esfera.
 * @param ycenter Coordenada y do centro da esfera.
 * @param zcenter Coordenada z do centro da esfera.
 * @param radius Raio da esfera.
 */
void Sculptor::putSphere(int xcenter, int ycenter, int zcenter, int radius){
  if (xcenter < 0 || xcenter >= nx || ycenter < 0 || ycenter >= ny || zcenter < 0 || zcenter >= nz) {
        return;
    }

    for (int x = 0; x < nx; x++) {
        for (int y = 0; y < ny; y++) {
            for (int z = 0; z < nz; z++) {
                double distance = sqrt((x - xcenter) * (x - xcenter) +
                                       (y - ycenter) * (y - ycenter) +
                                       (z - zcenter) * (z - zcenter));

                if (distance <= radius) {
                    putVoxel(x, y, z);
                }
            }
        }
    }
};
/**
 * @brief Desativa um conjunto de voxels formando uma esfera centrada em (xcenter, ycenter, zcenter) com raio 'radius'.
 *
 * @param xcenter Coordenada x do centro da esfera.
 * @param ycenter Coordenada y do centro da esfera.
 * @param zcenter Coordenada z do centro da esfera.
 * @param radius Raio da esfera.
 */
void Sculptor::cutSphere(int xcenter, int ycenter, int zcenter, int radius){
  if (xcenter < 0 || xcenter >= nx || ycenter < 0 || ycenter >= ny || zcenter < 0 || zcenter >= nz) {
        return;
    }

    for (int x = 0; x < nx; x++) {
        for (int y = 0; y < ny; y++) {
            for (int z = 0; z < nz; z++) {
                double distance = sqrt((x - xcenter) * (x - xcenter) + (y - ycenter) * (y - ycenter) + (z - zcenter) * (z - zcenter));
                if (distance <= radius) {
                    cutVoxel(x,y,z);
                }
            }
        }
    }
};
/**
 * @brief Ativa um conjunto de voxels formando uma elipsoide centrada em (xcenter, ycenter, zcenter) com raios (rx, ry, rz).
 *
 * @param xcenter Coordenada x do centro da elipsoide.
 * @param ycenter Coordenada y do centro da elipsoide.
 * @param zcenter Coordenada z do centro da elipsoide.
 * @param rx Raio no eixo x.
 * @param ry Raio no eixo y.
 * @param rz Raio no eixo z.
 */
void Sculptor::putEllipsoid(int xcenter, int ycenter, int zcenter, int rx, int ry, int rz){
  if (xcenter - rx < 0 || xcenter + rx >= nx || ycenter - ry < 0 || ycenter + ry >= ny || zcenter - rz < 0 || zcenter + rz >= nz) {
        return;
    }

    for (int x = xcenter - rx; x <= xcenter + rx; x++) {
        for (int y = ycenter - ry; y <= ycenter + ry; y++) {
            for (int z = zcenter - rz; z <= zcenter + rz; z++) {
                if (((x - xcenter) * (x - xcenter)) / (rx * rx) + ((y - ycenter) * (y - ycenter)) / (ry * ry) + ((z - zcenter) * (z - zcenter)) / (rz * rz) <= 1.0) {
                    putVoxel(x, y, z);
                }
            }
        }
    }
};
/**
 * @brief Desativa um conjunto de voxels formando uma elipsoide centrada em (xcenter, ycenter, zcenter) com raios (rx, ry, rz).
 *
 * @param xcenter Coordenada x do centro da elipsoide.
 * @param ycenter Coordenada y do centro da elipsoide.
 * @param zcenter Coordenada z do centro da elipsoide.
 * @param rx Raio no eixo x.
 * @param ry Raio no eixo y.
 * @param rz Raio no eixo z.
 */
void Sculptor::cutEllipsoid(int xcenter, int ycenter, int zcenter, int rx, int ry, int rz){
  if (xcenter - rx < 0 || xcenter + rx >= nx || ycenter - ry < 0 || ycenter + ry >= ny || zcenter - rz < 0 || zcenter + rz >= nz) {
        return;
    }

    for (int x = xcenter - rx; x <= xcenter + rx; x++) {
        for (int y = ycenter - ry; y <= ycenter + ry; y++) {
            for (int z = zcenter - rz; z <= zcenter + rz; z++) {
                if (((x - xcenter) * (x - xcenter)) / (rx * rx) + ((y - ycenter) * (y - ycenter)) / (ry * ry) + ((z - zcenter) * (z - zcenter)) / (rz * rz) <= 1.0) {
                    cutVoxel(x, y, z);
                }
            }
        }
    }
};
/**
 * @brief Gera um arquivo no formato OFF que representa o objeto esculpido.
 *
 * @param filename Nome do arquivo a ser gerado.
 */
void Sculptor::writeOFF(char* filename) {
    std::ofstream outfile(filename);

    if (!outfile.is_open()) {
        std::cerr << "Não foi possível criar o arquivo OFF." << std::endl;
        return;
    }

    // Contagem de voxels ativos (que serão convertidos em vértices)
    int numVertices = 0;
    int numFaces = 0;
    for (int i = 0; i < nx; i++) {
        for (int j = 0; j < ny; j++) {
            for (int k = 0; k < nz; k++) {
                if (v[i][j][k].show) {
                    numVertices += 8; // 8 vértices por voxel
                    numFaces +=6;
                }
            }
        }
    }
    // Escreve o cabeçalho OFF no arquivo
    outfile << "OFF\n";
    outfile << numVertices << " " << numFaces << " 0\n";

    // Escreve as coordenadas dos vértices (voxels ativos)
    for (int i = 0; i < nx; i++) {
        for (int j = 0; j < ny; j++) {
            for (int k = 0; k < nz; k++) {
                if (v[i][j][k].show) {
                    float x0 = i - 0.5;
                    float y0 = j - 0.5;
                    float z0 = k - 0.5;

                    float x1 = i + 0.5;
                    float y1 = j - 0.5;
                    float z1 = k - 0.5;

                    float x2 = i - 0.5;
                    float y2 = j + 0.5;
                    float z2 = k - 0.5;

                    float x3 = i + 0.5;
                    float y3 = j + 0.5;
                    float z3 = k - 0.5;

                    float x4 = i - 0.5;
                    float y4 = j - 0.5;
                    float z4 = k + 0.5;

                    float x5 = i + 0.5;
                    float y5 = j - 0.5;
                    float z5 = k + 0.5;

                    float x6 = i - 0.5;
                    float y6 = j + 0.5;
                    float z6 = k + 0.5;

                    float x7 = i + 0.5;
                    float y7 = j + 0.5;
                    float z7 = k + 0.5;

                    // Escreve os vértices do cubo
                    outfile << x0 << " " << y0 << " " << z0 << "\n";
                    outfile << x1 << " " << y1 << " " << z1 << "\n";
                    outfile << x2 << " " << y2 << " " << z2 << "\n";
                    outfile << x3 << " " << y3 << " " << z3 << "\n";
                    outfile << x4 << " " << y4 << " " << z4 << "\n";
                    outfile << x5 << " " << y5 << " " << z5 << "\n";
                    outfile << x6 << " " << y6 << " " << z6 << "\n";
                    outfile << x7 << " " << y7 << " " << z7 << "\n";
                }
            }
        }
    }
int vertexIndex = 0;
    // Escreve as definições das faces
    for (int i = 0; i < nx; i++) {
        for (int j = 0; j < ny; j++) {
            for (int k = 0; k < nz; k++) {
                if (v[i][j][k].show) {
                    // Defina as faces do cubo (6 faces)
                     // O índice do primeiro vértice do cubo

                    outfile << "4 " << vertexIndex << " " << vertexIndex + 1 << " " << vertexIndex + 3 << " " << vertexIndex + 2 << " " << v[i][j][k].r << " " << v[i][j][k].g << " " << v[i][j][k].b << " " << v[i][j][k].a << "\n";
                    outfile << "4 " << vertexIndex << " " << vertexIndex + 2 << " " << vertexIndex + 6 << " " << vertexIndex + 4 << " " << v[i][j][k].r << " " << v[i][j][k].g << " " << v[i][j][k].b << " " << v[i][j][k].a << "\n";
                    outfile << "4 " << vertexIndex << " " << vertexIndex + 1 << " " << vertexIndex + 5 << " " << vertexIndex + 4 << " " << v[i][j][k].r << " " << v[i][j][k].g << " " << v[i][j][k].b << " " << v[i][j][k].a << "\n";
                    outfile << "4 " << vertexIndex + 7 << " " << vertexIndex + 3 << " " << vertexIndex + 1 << " " << vertexIndex + 5 << " " << v[i][j][k].r << " " << v[i][j][k].g << " " << v[i][j][k].b << " " << v[i][j][k].a << "\n";
                    outfile << "4 " << vertexIndex + 7 << " " << vertexIndex + 3 << " " << vertexIndex + 2 << " " << vertexIndex + 6 << " " << v[i][j][k].r << " " << v[i][j][k].g << " " << v[i][j][k].b << " " << v[i][j][k].a << "\n";
                    outfile << "4 " << vertexIndex + 7 << " " << vertexIndex + 5 << " " << vertexIndex + 4 << " " << vertexIndex + 6 << " " << v[i][j][k].r << " " << v[i][j][k].g << " " << v[i][j][k].b << " " << v[i][j][k].a << "\n";

                    numFaces += 6;
                  vertexIndex += 8;
                }
            }
        }
    }

    // Fecha o arquivo
    outfile.close();
};